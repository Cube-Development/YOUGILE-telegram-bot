/**
 * Скрипт генерации TypeScript-типов и констант API-путей
 * из локальной OpenAPI-спецификации (document (1).json).
 *
 * Группирует пути по тегам и создаёт отдельный файл на каждый тег.
 * Генерирует интерфейсы из components/schemas → types.ts
 *
 * Использование: npx tsx src/scripts/generate-api.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

const PROJECT_ROOT = resolve(__dirname, "..");
const SPEC_PATH = join(PROJECT_ROOT, "shared/api/generated/api-docs.json");
const PATHS_DIR = join(PROJECT_ROOT, "shared/api/generated/paths");
const TYPES_DIR = join(PROJECT_ROOT, "shared/api/generated");

// ─── Types ───────────────────────────────────────────────

interface OpenAPISchema {
	type?: string;
	$ref?: string;
	properties?: Record<string, OpenAPISchema>;
	required?: string[];
	items?: OpenAPISchema;
	allOf?: OpenAPISchema[];
	anyOf?: OpenAPISchema[];
	oneOf?: OpenAPISchema[];
	enum?: (string | number)[];
	description?: string;
	format?: string;
	default?: any;
	additionalProperties?: boolean | OpenAPISchema;
}

interface OpenAPIOperation {
	tags?: string[];
	summary?: string;
	operationId?: string;
	deprecated?: boolean;
	parameters?: Array<{
		name: string;
		in: string;
		required?: boolean;
		schema?: OpenAPISchema;
	}>;
	requestBody?: {
		content?: Record<string, { schema?: OpenAPISchema }>;
	};
	responses?: Record<
		string,
		{ content?: Record<string, { schema?: OpenAPISchema }> }
	>;
}

interface OpenAPISpec {
	paths: Record<string, Record<string, OpenAPIOperation>>;
	components?: { schemas?: Record<string, OpenAPISchema> };
}

interface PathEntry {
	name: string;
	path: string;
	method: string;
	pathParams: string[];
	bodyType: string;
	queryType: string;
	responseType: string;
	deps: string[];
	summary?: string;
}

// ─── Transliteration ────────────────────────────────────

const TRANSLIT: Record<string, string> = {
	а: "a",
	б: "b",
	в: "v",
	г: "g",
	д: "d",
	е: "e",
	ё: "yo",
	ж: "zh",
	з: "z",
	и: "i",
	й: "y",
	к: "k",
	л: "l",
	м: "m",
	н: "n",
	о: "o",
	п: "p",
	р: "r",
	с: "s",
	т: "t",
	у: "u",
	ф: "f",
	х: "h",
	ц: "ts",
	ч: "ch",
	ш: "sh",
	щ: "sch",
	ъ: "",
	ы: "y",
	ь: "",
	э: "e",
	ю: "yu",
	я: "ya"
};

function transliterate(str: string): string {
	return str
		.split("")
		.map((c) => {
			const lower = c.toLowerCase();
			const mapped = TRANSLIT[lower];
			if (mapped === undefined) return c;
			return c === lower
				? mapped
				: mapped.charAt(0).toUpperCase() + mapped.slice(1);
		})
		.join("");
}

// ─── Helpers ────────────────────────────────────────────

function toPascalCase(str: string): string {
	return str
		.replace(/[^a-zA-Z0-9]/g, " ")
		.split(/\s+/)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join("");
}

function toCamelCase(str: string): string {
	return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function operationIdToName(operationId: string): string {
	const parts = operationId.split("_");
	const httpMethods = ["get", "post", "patch", "delete", "put"];
	if (httpMethods.includes(parts[parts.length - 1])) parts.pop();

	const cleaned = parts.filter(
		(p) => !p.startsWith("{") && p !== "" && !/^[a-f0-9-]{36}$/.test(p)
	);

	return cleaned
		.map((part, i) =>
			i === 0
				? part.toLowerCase()
				: part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
		)
		.join("");
}

function tagToFileName(tag: string): string {
	return transliterate(tag)
		.toLowerCase()
		.replace(/[&]/g, "-")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function tagToObjectName(tag: string): string {
	return (
		transliterate(tag)
			.replace(/[&]/g, "_")
			.replace(/\s+/g, "_")
			.replace(/_+/g, "_")
			.toUpperCase() + "_PATHS"
	);
}

function extractPathParams(path: string): string[] {
	return [...path.matchAll(/\{[*]?(\w+)\}/g)].map((m) => m[1]);
}

function pathToTemplateLiteral(path: string): string {
	return path.replace(
		/\{[*]?(\w+)\}/g,
		(_, name) => `\${${toCamelCase(name)}}`
	);
}

// ─── Schema → TS type ───────────────────────────────────

function refName(ref: string): string {
	return ref.split("/").pop()!;
}

function schemaToTS(schema: OpenAPISchema | undefined): {
	type: string;
	deps: string[];
} {
	if (!schema || Object.keys(schema).length === 0)
		return { type: "void", deps: [] };

	if (schema.$ref) {
		const name = refName(schema.$ref);
		if (name) {
			return { type: name, deps: [name] };
		}
	}

	if (schema.anyOf || schema.oneOf) {
		const variants = (schema.anyOf || schema.oneOf)!;
		const results = variants.map((v) => schemaToTS(v));
		const types = [...new Set(results.map((r) => r.type))].filter(
			(t) => t !== "void" || results.length === 1
		);
		const deps = [...new Set(results.flatMap((r) => r.deps))];
		return { type: types.join(" | "), deps };
	}

	if (schema.allOf) {
		const results = schema.allOf.map((v) => schemaToTS(v));
		return {
			type: results.map((r) => r.type).join(" & "),
			deps: [...new Set(results.flatMap((r) => r.deps))]
		};
	}

	if (schema.type === "array") {
		const inner = schemaToTS(schema.items);
		return { type: `${inner.type}[]`, deps: inner.deps };
	}

	if (schema.enum) {
		const values = schema.enum.map((v) =>
			typeof v === "string" ? `"${v}"` : String(v)
		);
		return { type: values.join(" | "), deps: [] };
	}

	if (Array.isArray(schema.type)) {
		return {
			type: schema.type
				.map((t) => (t === "integer" ? "number" : t))
				.join(" | "),
			deps: []
		};
	}

	if (schema.type === "integer") return { type: "number", deps: [] };
	if (schema.type === "number") return { type: "number", deps: [] };
	if (schema.type === "string") return { type: "string", deps: [] };
	if (schema.type === "boolean") return { type: "boolean", deps: [] };
	if (schema.type === "null") return { type: "null", deps: [] };

	if (schema.type === "object" || schema.properties) {
		if (!schema.properties || Object.keys(schema.properties).length === 0) {
			return { type: "Record<string, any>", deps: [] };
		}
		const deps: string[] = [];
		const props = Object.entries(schema.properties).map(([key, prop]) => {
			const info = schemaToTS(prop);
			deps.push(...info.deps);
			const optional = schema.required?.includes(key) ? "" : "?";
			return `${key}${optional}: ${info.type}`;
		});
		return { type: `{ ${props.join("; ")} }`, deps };
	}

	return { type: "any", deps: [] };
}

function resolveSchemaType(
	schema: OpenAPISchema | undefined,
	operationId: string,
	prefix: string
): { type: string; deps: string[] } {
	if (!schema) return { type: "void", deps: [] };

	const info = schemaToTS(schema);
	// Если это inline-схема, просто возвращаем её как есть
	return info;
}

function resolveQueryType(params: OpenAPIOperation["parameters"]): {
	type: string;
	deps: string[];
} {
	const queryParams = params?.filter((p) => p.in === "query") || [];
	if (queryParams.length === 0) return { type: "void", deps: [] };

	const parts: string[] = [];
	const deps = new Set<string>();

	for (const p of queryParams) {
		const info = schemaToTS(p.schema);
		info.deps.forEach((d) => deps.add(d));
		parts.push(`${p.name}${p.required ? "" : "?"}: ${info.type}`);
	}

	return { type: `{ ${parts.join(", ")} }`, deps: Array.from(deps) };
}

// ─── Types generation (Api.ts) ──────────────────────────

function generateTypesFile(schemas: Record<string, OpenAPISchema>): string {
	const lines: string[] = [
		"// AUTO-GENERATED — не редактировать вручную",
		"// Сгенерировано скриптом scripts/generate-api.ts",
		""
	];

	for (const [name, schema] of Object.entries(schemas)) {
		if (!name) continue;

		lines.push("");

		if (schema.enum) {
			const values = schema.enum.map((v) =>
				typeof v === "string" ? `"${v}"` : String(v)
			);
			lines.push(`export type ${name} = ${values.join(" | ")};`);
			continue;
		}

		if (schema.allOf) {
			// Merge allOf: collect refs and inline properties
			const refs: string[] = [];
			let mergedProps: Record<string, OpenAPISchema> = {};
			let mergedRequired: string[] = [];

			for (const sub of schema.allOf) {
				if (sub.$ref) {
					refs.push(refName(sub.$ref));
				} else if (sub.properties) {
					mergedProps = { ...mergedProps, ...sub.properties };
					if (sub.required) mergedRequired.push(...sub.required);
				}
			}

			if (refs.length > 0 && Object.keys(mergedProps).length === 0) {
				lines.push(`export type ${name} = ${refs.join(" & ")};`);
			} else {
				const extendsClause =
					refs.length > 0 ? ` extends ${refs.join(", ")}` : "";
				lines.push(`export interface ${name}${extendsClause} {`);
				for (const [prop, propSchema] of Object.entries(mergedProps)) {
					const optional = mergedRequired.includes(prop) ? "" : "?";
					const { type } = schemaToTS(propSchema);
					const desc = propSchema.description
						? ` /** ${propSchema.description} */`
						: "";
					if (desc) lines.push(`\t${desc}`);
					lines.push(`\t${prop}${optional}: ${type};`);
				}
				lines.push("}");
			}
			continue;
		}

		if (schema.type === "object" || schema.properties) {
			lines.push(`export interface ${name} {`);
			if (schema.properties) {
				for (const [prop, propSchema] of Object.entries(
					schema.properties
				)) {
					const optional = schema.required?.includes(prop) ? "" : "?";
					const { type } = schemaToTS(propSchema);
					if (propSchema.description) {
						lines.push(`\t/** ${propSchema.description} */`);
					}
					lines.push(`\t${prop}${optional}: ${type};`);
				}
			}
			if (schema.additionalProperties) {
				const addType =
					typeof schema.additionalProperties === "boolean"
						? "any"
						: schemaToTS(schema.additionalProperties).type;
				lines.push(`\t[key: string]: ${addType};`);
			}
			lines.push("}");
			continue;
		}

		// Type alias for other cases
		const { type } = schemaToTS(schema);
		lines.push(`export type ${name} = ${type};`);
	}

	return lines.join("\n") + "\n";
}

// ─── Paths generation ───────────────────────────────────

function generateFileContent(tag: string, entries: PathEntry[]): string {
	const objectName = tagToObjectName(tag);
	const allDeps = Array.from(new Set(entries.flatMap((e) => e.deps))).filter(
		(t) =>
			t !== "void" &&
			t !== "any" &&
			!t.includes("[]") &&
			!t.startsWith("{")
	);

	const entryLines = entries.map((entry) => {
		const params = entry.pathParams;
		const method = entry.method.toUpperCase();
		const types = `_types: {} as { body: ${entry.bodyType}, query: ${entry.queryType}, response: ${entry.responseType} }`;
		const summary = entry.summary
			? `, summary: "${entry.summary.replace(/"/g, '\\"')}"`
			: "";

		if (params.length > 0) {
			const paramList = params
				.map((p) => `${toCamelCase(p)}: string`)
				.join(", ");
			return `\t${entry.name}: (${paramList}) => ({ url: \`${pathToTemplateLiteral(entry.path)}\`, method: "${method}"${summary}, ${types} }) as const`;
		}
		return `\t${entry.name}: { url: "${entry.path}", method: "${method}"${summary}, ${types} } as const`;
	});

	const seen = new Set<string>();
	const uniqueLines = entryLines.filter((line) => {
		const name = line.match(/\t(\w+):/)?.[1];
		if (!name || seen.has(name)) return false;
		seen.add(name);
		return true;
	});

	return [
		allDeps.length > 0
			? `import type {\n${allDeps
					.sort()
					.map((t) => `\t${t}`)
					.join(",\n")}\n} from "../types";\n`
			: "",
		"// AUTO-GENERATED — не редактировать вручную",
		"// Сгенерировано скриптом scripts/generate-api.ts",
		"",
		`export const ${objectName} = {`,
		uniqueLines.join(",\n"),
		"} as const;"
	].join("\n");
}

// ─── Main ───────────────────────────────────────────────

function main() {
	console.log(`🚀 Codegen started from ${SPEC_PATH}...`);

	const raw = readFileSync(SPEC_PATH, "utf-8");
	const spec: OpenAPISpec = JSON.parse(raw);

	// 1. Генерируем типы
	console.log("📦 Step 1: Generating types.ts from schemas...");
	const schemas = spec.components?.schemas ?? {};
	mkdirSync(TYPES_DIR, { recursive: true });
	writeFileSync(
		join(TYPES_DIR, "types.ts"),
		generateTypesFile(schemas),
		"utf-8"
	);
	console.log(`  ✔ types.ts (${Object.keys(schemas).length} schemas)`);

	// 2. Парсим пути и группируем по тегам
	console.log("🔗 Step 2: Parsing paths & generating constants...");
	const tagMap = new Map<string, PathEntry[]>();

	for (const [path, methods] of Object.entries(spec.paths)) {
		for (const method of ["get", "post", "put", "patch", "delete"]) {
			const operation = methods[method] as OpenAPIOperation | undefined;
			if (!operation) continue;

			const operationId = operation.operationId ?? `${method}_${path}`;
			const name = operationIdToName(operationId);

			const reqContent = operation.requestBody?.content;
			const bodySchema = reqContent
				? Object.values(reqContent)[0]?.schema
				: undefined;
			const bodyInfo = resolveSchemaType(bodySchema, operationId, "Body");
			if (!bodyInfo.type)
				console.log("EMPTY TYPE!!!", operationId, bodySchema);

			const queryInfo = resolveQueryType(operation.parameters);

			const resContent = (
				operation.responses?.["200"] ||
				operation.responses?.["201"] ||
				operation.responses?.["204"]
			)?.content;
			const responseSchema = resContent
				? Object.values(resContent)[0]?.schema
				: undefined;
			const responseInfo = resolveSchemaType(
				responseSchema,
				operationId,
				"Response"
			);

			const deps = Array.from(
				new Set([
					...bodyInfo.deps,
					...queryInfo.deps,
					...responseInfo.deps
				])
			);

			console.log(`  - [${method.toUpperCase()}] ${path} -> ${name}`);

			for (const tag of operation.tags ?? ["Default"]) {
				if (!tagMap.has(tag)) tagMap.set(tag, []);
				tagMap.get(tag)!.push({
					name,
					path,
					method,
					pathParams: extractPathParams(path),
					bodyType: bodyInfo.type,
					queryType: queryInfo.type,
					responseType: responseInfo.type,
					deps,
					summary: operation.summary
				});
			}
		}
	}

	// 3. Записываем файлы путей
	mkdirSync(PATHS_DIR, { recursive: true });
	const indexExports: string[] = [];

	for (const [tag, entries] of tagMap) {
		const fileName = `${tagToFileName(tag)}.paths.ts`;
		writeFileSync(
			join(PATHS_DIR, fileName),
			generateFileContent(tag, entries),
			"utf-8"
		);
		console.log(`  ✔ ${fileName}`);
		indexExports.push(
			`export { ${tagToObjectName(tag)} } from "./${tagToFileName(tag)}.paths";`
		);
	}

	writeFileSync(
		join(PATHS_DIR, "index.ts"),
		`// AUTO-GENERATED\n\n${indexExports.join("\n")}\n`,
		"utf-8"
	);

	// 4. Главный index
	writeFileSync(
		join(TYPES_DIR, "index.ts"),
		[
			"// AUTO-GENERATED",
			"",
			'export * from "./types";',
			'export * from "./paths";',
			""
		].join("\n"),
		"utf-8"
	);

	console.log(`\n✅ Done! Generated ${tagMap.size} path files + types.ts`);
}

main();
