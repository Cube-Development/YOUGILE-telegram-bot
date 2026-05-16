// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api.ts

export interface CredentialsWithNameDto {
	/** Логин пользователя */
	login: string;
	/** Пароль пользователя */
	password: string;
	/** Название компании */
	name?: string;
}

export interface PagingMetadata {
	/** Количество элементов в результате */
	count: number;
	/** Количество элементов на страницу */
	limit: number;
	/** Индекс первого элемента страницы */
	offset: number;
	/** Есть ли элементы после данной страницы */
	next: boolean;
}

export interface CompanyListDtoBase {
	/** ID объекта */
	id: string;
	/** Название компании */
	name: string;
	/** Права администратора в компании */
	isAdmin: boolean;
}

export interface CompanyListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список компаний пользователя */
	content: CompanyListDtoBase[];
}

export interface CredentialsWithCompanyOptionalDto {
	/** Логин пользователя */
	login: string;
	/** Пароль пользователя */
	password: string;
	/** ID компании. Для получения ID компании можно использовать горячие клавиши в интерфейсе (Ctrl+Alt+Q / Ctrl+Option+Q для Mac) или воспользоваться [методом POST /auth/companies](../operations/getCompanies) */
	companyId?: string;
}

export interface AuthKeyWithDetailsDto {
	/** Ключ авторизации */
	key: string;
	/** ID компании, к которой относится ключ */
	companyId: string;
	/** Время создания */
	timestamp: number;
	/** Ключ удален - да/нет */
	deleted: boolean;
}

export interface CredentialsWithCompanyDto {
	/** Логин пользователя */
	login: string;
	/** Пароль пользователя */
	password: string;
	/** ID компании. Для получения ID компании можно использовать горячие клавиши в интерфейсе (Ctrl+Alt+Q / Ctrl+Option+Q для Mac) или воспользоваться [методом POST /auth/companies](../operations/getCompanies) */
	companyId: string;
}

export interface AuthKeyDto {
	/** Ключ авторизации */
	key: string;
}

export interface UserListDtoBase {
	/** ID объекта */
	id: string;
	/** Почтовый ящик сотрудника */
	email: string;
	/** Имеет ли пользователь права администратора */
	isAdmin?: boolean;
	/** ФИО */
	realName: string;
	/** Статус online/offline */
	status: string;
	/** Время последнего действия в системе */
	lastActivity: number;
}

export interface UserListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список сотрудников */
	content: UserListDtoBase[];
}

export interface UserDto {
	/** ID объекта */
	id: string;
	/** Почтовый ящик сотрудника */
	email: string;
	/** Имеет ли пользователь права администратора */
	isAdmin?: boolean;
	/** ФИО */
	realName: string;
	/** Статус online/offline */
	status: string;
	/** Время последнего действия в системе */
	lastActivity: number;
}

export interface CreateUserDto {
	/** Почтовый ящик сотрудника */
	email: string;
	/** Имеет ли пользователь права администратора */
	isAdmin?: boolean;
}

export interface WithIdDto {
	/** ID объекта */
	id: string;
}

export interface UpdateUserDto {
	/** Имеет ли пользователь права администратора */
	isAdmin?: boolean;
}

export interface CompanyDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название компании */
	title: string;
	/** Время создания компании */
	timestamp: number;
	/** Вспомогательные данные для разработки */
	apiData?: Record<string, any>;
}

export interface UpdateCompanyDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название компании */
	title?: string;
	/** Вспомогательные данные для разработки */
	apiData?: Record<string, any>;
}

export interface FileUploadDto {
	/** Результат загрузки */
	result: string;
	/** URL файла */
	url: string;
	/** Полный URL файла */
	fullUrl: string;
}

export interface ProjectListDtoBase {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название проекта */
	title: string;
	/** Время создания проекта */
	timestamp: number;
	/** Сотрудники на проекте и их роль. Возможные значения: <br/><div>1) системные роли: worker, admin, observer</div><div>2) ID пользовательской роли</div><div>3) "-" для удаления существующего пользователя из проекта</div> */
	users?: Record<string, any>;
}

export interface ProjectListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список проектов */
	content: ProjectListDtoBase[];
}

export interface ProjectDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название проекта */
	title: string;
	/** Время создания проекта */
	timestamp: number;
	/** Сотрудники на проекте и их роль. Возможные значения: <br/><div>1) системные роли: worker, admin, observer</div><div>2) ID пользовательской роли</div><div>3) "-" для удаления существующего пользователя из проекта</div> */
	users?: Record<string, any>;
}

export interface CreateProjectDto {
	/** Название проекта */
	title: string;
	/** Сотрудники на проекте и их роль. Возможные значения: <br/><div>1) системные роли: worker, admin, observer</div><div>2) ID пользовательской роли</div><div>3) "-" для удаления существующего пользователя из проекта</div> */
	users?: Record<string, any>;
}

export interface UpdateProjectDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название проекта */
	title?: string;
	/** Сотрудники на проекте и их роль. Возможные значения: <br/><div>1) системные роли: worker, admin, observer</div><div>2) ID пользовательской роли</div><div>3) "-" для удаления существующего пользователя из проекта</div> */
	users?: Record<string, any>;
}

export interface TaskPermissionsDto {
	show: boolean;
	delete: boolean;
	editTitle: boolean;
	editDescription: boolean;
	complete: boolean;
	close: boolean;
	assignUsers: "no" | "yes" | "add-self" | "set-self" | "change-from-self";
	connect: boolean;
	editSubtasks: "no" | "yes" | "complete";
	editStickers: boolean;
	editPins: boolean;
	move: "no" | "project" | "yes" | "board";
	sendMessages: boolean;
	sendFiles: boolean;
	editWhoToNotify: "no" | "yes" | "self";
}

export interface ColumnPermissionsDto {
	editTitle: boolean;
	delete: boolean;
	move: "no" | "project" | "yes";
	addTask: boolean;
	allTasks: TaskPermissionsDto;
	withMeTasks: TaskPermissionsDto;
	myTasks: TaskPermissionsDto;
	createdByMeTasks: TaskPermissionsDto;
}

export interface BoardPermissionsDto {
	editTitle: boolean;
	delete: boolean;
	move: boolean;
	showStickers: boolean;
	editStickers: boolean;
	addColumn: boolean;
	columns: ColumnPermissionsDto;
	settings: boolean;
}

export interface ChildrenDto {}

export interface ProjectPermissionsDto {
	editTitle: boolean;
	delete: boolean;
	addBoard: boolean;
	boards: BoardPermissionsDto;
	children: ChildrenDto;
}

export interface ProjectRoleListDtoBase {
	/** ID объекта */
	id: string;
	/** Название роли */
	name: string;
	/** Описание роли */
	description?: string;
	/** Права в проекте */
	permissions: ProjectPermissionsDto;
}

export interface ProjectRoleListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список ролей в проекте */
	content: ProjectRoleListDtoBase[];
}

export interface ProjectRoleDto {
	/** ID объекта */
	id: string;
	/** Название роли */
	name: string;
	/** Описание роли */
	description?: string;
	/** Права в проекте */
	permissions: ProjectPermissionsDto;
}

export interface CreateProjectRoleDto {
	/** Название роли */
	name: string;
	/** Описание роли */
	description?: string;
	/** Права в проекте */
	permissions: ProjectPermissionsDto;
}

export interface UpdateProjectRoleDto {
	/** Название роли */
	name?: string;
	/** Описание роли */
	description?: string;
	/** Права в проекте */
	permissions?: ProjectPermissionsDto;
}

export interface DepartmentListDtoBase {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название отдела */
	title: string;
	/** Id родительского отдела. Оставить пустым или "-", если это отдел верхнего уровня */
	parentId?: string;
	/** Сотрудники на отделе и их роль. Возможные значения: <br/><div>1) manager или member</div><div>2) "-" или "" для удаления существующего пользователя из отдела</div> */
	users?: Record<string, any>;
}

export interface DepartmentListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список отделов */
	content: DepartmentListDtoBase[];
}

export interface DepartmentDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название отдела */
	title: string;
	/** Id родительского отдела. Оставить пустым или "-", если это отдел верхнего уровня */
	parentId?: string;
	/** Сотрудники на отделе и их роль. Возможные значения: <br/><div>1) manager или member</div><div>2) "-" или "" для удаления существующего пользователя из отдела</div> */
	users?: Record<string, any>;
}

export interface CreateDepartmentDto {
	/** Название отдела */
	title: string;
	/** Id родительского отдела. Оставить пустым или "-", если это отдел верхнего уровня */
	parentId?: string;
	/** Сотрудники на отделе и их роль. Возможные значения: <br/><div>1) manager или member</div><div>2) "-" или "" для удаления существующего пользователя из отдела</div> */
	users?: Record<string, any>;
}

export interface UpdateDepartmentDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название отдела */
	title?: string;
	/** Id родительского отдела. Оставить пустым или "-", если это отдел верхнего уровня */
	parentId?: string;
	/** Сотрудники на отделе и их роль. Возможные значения: <br/><div>1) manager или member</div><div>2) "-" или "" для удаления существующего пользователя из отдела</div> */
	users?: Record<string, any>;
}

export interface StickersDto {
	/** Таймер */
	timer?: boolean;
	/** Дедлайн */
	deadline?: boolean;
	/** Секундомер */
	stopwatch?: boolean;
	/** Таймтрекинг */
	timeTracking?: boolean;
	/** Исполнитель */
	assignee?: boolean;
	/** Регулярная задача */
	repeat?: boolean;
	/** Пользовательские стикеры доски */
	custom?: Record<string, any>;
}

export interface BoardListDtoBase {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название доски */
	title: string;
	/** ID проекта, в котором находится доска */
	projectId: string;
	/** Стикеры доски */
	stickers?: StickersDto;
}

export interface BoardListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список досок */
	content: BoardListDtoBase[];
}

export interface BoardDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название доски */
	title: string;
	/** ID проекта, в котором находится доска */
	projectId: string;
	/** Стикеры доски */
	stickers?: StickersDto;
}

export interface CreateBoardDto {
	/** Название доски */
	title: string;
	/** ID проекта, в котором находится доска */
	projectId: string;
	/** Стикеры доски */
	stickers?: StickersDto;
}

export interface UpdateBoardDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название доски */
	title?: string;
	/** ID проекта, в котором находится доска */
	projectId?: string;
	/** Стикеры доски */
	stickers?: StickersDto;
}

export interface ColumnListDtoBase {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название колонки */
	title: string;
	/** Цвет колонки. Указывается в виде числа. Примеры цветов представлены ниже <br/><div>1 - #7B869E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7B869E
      ">
 </div>
</div><div>2 - #FF8C8C <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FF8C8C
      ">
 </div>
</div><div>3 - #E9A24F <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E9A24F
      ">
 </div>
</div><div>4 - #FCE258 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FCE258
      ">
 </div>
</div><div>5 - #7CAE5E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7CAE5E
      ">
 </div>
</div><div>6 - #49C5BC <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #49C5BC
      ">
 </div>
</div><div>7 - #8CACFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #8CACFF
      ">
 </div>
</div><div>8 - #CC8CFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #CC8CFF
      ">
 </div>
</div><div>9 - #667085 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #667085
      ">
 </div>
</div><div>10 - #EB3737 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #EB3737
      ">
 </div>
</div><div>11 - #F2732B <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F2732B
      ">
 </div>
</div><div>12 - #F5CC00 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F5CC00
      ">
 </div>
</div><div>13 - #5CDC11 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5CDC11
      ">
 </div>
</div><div>14 - #08A7A9 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #08A7A9
      ">
 </div>
</div><div>15 - #5089F2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5089F2
      ">
 </div>
</div><div>16 - #E25EF2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E25EF2
      ">
 </div>
</div> */
	color?: number;
	/** Id доски, в которой находится колонка */
	boardId: string;
}

export interface ColumnListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список колонок */
	content: ColumnListDtoBase[];
}

export interface ColumnDto {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название колонки */
	title: string;
	/** Цвет колонки. Указывается в виде числа. Примеры цветов представлены ниже <br/><div>1 - #7B869E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7B869E
      ">
 </div>
</div><div>2 - #FF8C8C <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FF8C8C
      ">
 </div>
</div><div>3 - #E9A24F <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E9A24F
      ">
 </div>
</div><div>4 - #FCE258 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FCE258
      ">
 </div>
</div><div>5 - #7CAE5E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7CAE5E
      ">
 </div>
</div><div>6 - #49C5BC <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #49C5BC
      ">
 </div>
</div><div>7 - #8CACFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #8CACFF
      ">
 </div>
</div><div>8 - #CC8CFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #CC8CFF
      ">
 </div>
</div><div>9 - #667085 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #667085
      ">
 </div>
</div><div>10 - #EB3737 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #EB3737
      ">
 </div>
</div><div>11 - #F2732B <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F2732B
      ">
 </div>
</div><div>12 - #F5CC00 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F5CC00
      ">
 </div>
</div><div>13 - #5CDC11 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5CDC11
      ">
 </div>
</div><div>14 - #08A7A9 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #08A7A9
      ">
 </div>
</div><div>15 - #5089F2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5089F2
      ">
 </div>
</div><div>16 - #E25EF2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E25EF2
      ">
 </div>
</div> */
	color?: number;
	/** Id доски, в которой находится колонка */
	boardId: string;
}

export interface CreateColumnDto {
	/** Название колонки */
	title: string;
	/** Цвет колонки. Указывается в виде числа. Примеры цветов представлены ниже <br/><div>1 - #7B869E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7B869E
      ">
 </div>
</div><div>2 - #FF8C8C <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FF8C8C
      ">
 </div>
</div><div>3 - #E9A24F <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E9A24F
      ">
 </div>
</div><div>4 - #FCE258 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FCE258
      ">
 </div>
</div><div>5 - #7CAE5E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7CAE5E
      ">
 </div>
</div><div>6 - #49C5BC <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #49C5BC
      ">
 </div>
</div><div>7 - #8CACFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #8CACFF
      ">
 </div>
</div><div>8 - #CC8CFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #CC8CFF
      ">
 </div>
</div><div>9 - #667085 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #667085
      ">
 </div>
</div><div>10 - #EB3737 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #EB3737
      ">
 </div>
</div><div>11 - #F2732B <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F2732B
      ">
 </div>
</div><div>12 - #F5CC00 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F5CC00
      ">
 </div>
</div><div>13 - #5CDC11 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5CDC11
      ">
 </div>
</div><div>14 - #08A7A9 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #08A7A9
      ">
 </div>
</div><div>15 - #5089F2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5089F2
      ">
 </div>
</div><div>16 - #E25EF2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E25EF2
      ">
 </div>
</div> */
	color?: number;
	/** Id доски, в которой находится колонка */
	boardId: string;
}

export interface UpdateColumnDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название колонки */
	title?: string;
	/** Цвет колонки. Указывается в виде числа. Примеры цветов представлены ниже <br/><div>1 - #7B869E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7B869E
      ">
 </div>
</div><div>2 - #FF8C8C <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FF8C8C
      ">
 </div>
</div><div>3 - #E9A24F <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E9A24F
      ">
 </div>
</div><div>4 - #FCE258 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #FCE258
      ">
 </div>
</div><div>5 - #7CAE5E <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #7CAE5E
      ">
 </div>
</div><div>6 - #49C5BC <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #49C5BC
      ">
 </div>
</div><div>7 - #8CACFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #8CACFF
      ">
 </div>
</div><div>8 - #CC8CFF <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #CC8CFF
      ">
 </div>
</div><div>9 - #667085 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #667085
      ">
 </div>
</div><div>10 - #EB3737 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #EB3737
      ">
 </div>
</div><div>11 - #F2732B <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F2732B
      ">
 </div>
</div><div>12 - #F5CC00 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #F5CC00
      ">
 </div>
</div><div>13 - #5CDC11 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5CDC11
      ">
 </div>
</div><div>14 - #08A7A9 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #08A7A9
      ">
 </div>
</div><div>15 - #5089F2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #5089F2
      ">
 </div>
</div><div>16 - #E25EF2 <div style="
        display: inline-block; 
        width: 10px; 
        height: 10px;
        background-color: #E25EF2
      ">
 </div>
</div> */
	color?: number;
	/** Id доски, в которой находится колонка */
	boardId?: string;
}

export interface Deadline {
	/** Timestamp дэдлайна */
	deadline: number;
	/** Timestamp начала задачи */
	startDate?: number;
	/** Отображать на стикере время, или только дату */
	withTime?: boolean;
	/** История изменений дедлайна */
	history?: string[];
	/** Точки, которые блокируют дату дедлайна (Начало или Конец) */
	blockedPoints: string[];
	/** Связанные задачи */
	links: string[];
}

export interface TimeTracking {
	/** Сколько часов было запланировано на выполнение задачи */
	plan: number;
	/** Сколько часов было затрачено на выполнение задачи */
	work: number;
}

export interface CheckListItem {
	/** Название чеклиста */
	title: string;
	/** Выполненность чеклиста */
	isCompleted: boolean;
}

export interface CheckList {
	/** Название списка чеклистов */
	title: string;
	/** Массив с чеклистами */
	items: CheckListItem;
}

export interface Stopwatch {
	/** Статус секундомера - запущен/остановлен */
	running: boolean;
	/** Сколько секунд прошло, пока таймер был запущен. */
	seconds: number;
	/** Момент времени, на который значение seconds было актуально */
	atMoment: number;
}

export interface Timer {
	/** Сколько секунд осталось до конца таймера. */
	seconds: number;
	/** Timestamp момента времени, от которого отсчитывается значение в поле seconds */
	since: number;
	/** Статус таймера - запущен/остановлен. */
	running: boolean;
}

export interface DealReadDto {
	/** Сумма сделки */
	dealAmount?: number;
	/** Кастомные поля сделки */
	customFields?: Record<string, any>;
	/** ID организации */
	organizationId?: string;
	/** ID контактных лиц */
	contactPersonIds?: string[];
}

export interface TaskListDtoBase {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название задачи */
	title: string;
	/** Время создания задачи */
	timestamp: number;
	/** Id колонки родителя */
	columnId?: string;
	/** Описание задачи */
	description?: string;
	/** Задача перенесена в архив - да/нет */
	archived?: boolean;
	/** Время, когда задача перенесена в архив */
	archivedTimestamp?: number;
	/** Задача выполнена - да/нет */
	completed?: boolean;
	/** Время, когда задача выполнена */
	completedTimestamp?: number;
	/** Массив Id подзадач */
	subtasks?: string[];
	/** Массив Id пользователей, на которых назначена задача */
	assigned?: string[];
	/** Id пользователя, который создал задачу */
	createdBy?: string;
	/** Стикер "Дэдлайн". Указывает на крайний срок выполнения задачи. Имеется возможность кроме даты указать время, а так же дату начала задачи. */
	deadline?: Deadline;
	/** Стикер "Таймтрекинг". Используется для указания ожидаемого и реального времени на выполнение задачи. */
	timeTracking?: TimeTracking;
	/** Чеклисты. К задаче всегда будет присвоен переданный объект. Если необходимо внести изменения, нужно сначала получить чеклисты, затем произвести корректировку, а затем записать в задачу заново. */
	checklists?: CheckList[];
	/** Пользовательские стикеры. Передаются в виде объекта ключ-значение,
где ключ — ID стикера, значение — ID состояния для стикеров с состоянием или строка со значением для стикеров свободных полей.<br />
Для открепления стикера от задачи, используйте "-" как значение состояния.<br />
Для прикрепления пустого стикера (без состояния), используйте "empty" как значение состояния.<br />
Для стикеров типа "свободное текстовое поле" передавайте произвольную строку, например "ООО «Производство»".<br />
Для стикеров типа "свободное числовое поле" передавайте строку, содержащую число, например "123" или "345.123"; разделитель целой и дробной части — точка "." */
	stickers?: Record<string, any>;
	/** Цвет карточки задач на доске, доступны цвета: task-primary, task-gray, task-red, task-pink, task-yellow, task-green, task-turquoise, task-blue, task-violet */
	color?:
		| "task-primary"
		| "task-gray"
		| "task-red"
		| "task-pink"
		| "task-yellow"
		| "task-green"
		| "task-turquoise"
		| "task-blue"
		| "task-violet";
	/** ID задачи, сквозной через всю компанию */
	idTaskCommon?: string;
	/** ID задачи, внутри проекта */
	idTaskProject?: string;
	/** Тип сущности */
	type?: "task" | "deal";
	stopwatch?: Stopwatch;
	timer?: Timer;
	deal?: DealReadDto;
	/** Данные расширений */
	extensionData?: Record<string, any>;
}

export interface TaskListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список задач */
	content: TaskListDtoBase[];
}

export interface TaskDto {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название задачи */
	title: string;
	/** Время создания задачи */
	timestamp: number;
	/** Id колонки родителя */
	columnId?: string;
	/** Описание задачи */
	description?: string;
	/** Задача перенесена в архив - да/нет */
	archived?: boolean;
	/** Время, когда задача перенесена в архив */
	archivedTimestamp?: number;
	/** Задача выполнена - да/нет */
	completed?: boolean;
	/** Время, когда задача выполнена */
	completedTimestamp?: number;
	/** Массив Id подзадач */
	subtasks?: string[];
	/** Массив Id пользователей, на которых назначена задача */
	assigned?: string[];
	/** Id пользователя, который создал задачу */
	createdBy?: string;
	/** Стикер "Дэдлайн". Указывает на крайний срок выполнения задачи. Имеется возможность кроме даты указать время, а так же дату начала задачи. */
	deadline?: Deadline;
	/** Стикер "Таймтрекинг". Используется для указания ожидаемого и реального времени на выполнение задачи. */
	timeTracking?: TimeTracking;
	/** Чеклисты. К задаче всегда будет присвоен переданный объект. Если необходимо внести изменения, нужно сначала получить чеклисты, затем произвести корректировку, а затем записать в задачу заново. */
	checklists?: CheckList[];
	/** Пользовательские стикеры. Передаются в виде объекта ключ-значение,
где ключ — ID стикера, значение — ID состояния для стикеров с состоянием или строка со значением для стикеров свободных полей.<br />
Для открепления стикера от задачи, используйте "-" как значение состояния.<br />
Для прикрепления пустого стикера (без состояния), используйте "empty" как значение состояния.<br />
Для стикеров типа "свободное текстовое поле" передавайте произвольную строку, например "ООО «Производство»".<br />
Для стикеров типа "свободное числовое поле" передавайте строку, содержащую число, например "123" или "345.123"; разделитель целой и дробной части — точка "." */
	stickers?: Record<string, any>;
	/** Цвет карточки задач на доске, доступны цвета: task-primary, task-gray, task-red, task-pink, task-yellow, task-green, task-turquoise, task-blue, task-violet */
	color?:
		| "task-primary"
		| "task-gray"
		| "task-red"
		| "task-pink"
		| "task-yellow"
		| "task-green"
		| "task-turquoise"
		| "task-blue"
		| "task-violet";
	/** ID задачи, сквозной через всю компанию */
	idTaskCommon?: string;
	/** ID задачи, внутри проекта */
	idTaskProject?: string;
	/** Тип сущности */
	type?: "task" | "deal";
	stopwatch?: Stopwatch;
	timer?: Timer;
	deal?: DealReadDto;
	/** Данные расширений */
	extensionData?: Record<string, any>;
}

export interface CreateStopwatch {
	/** Запустить или остановить секундомер */
	running: boolean;
}

export interface CreateTimer {
	/** Установить время таймера в секундах. */
	seconds: number;
	/** Запустить или остановить таймер. */
	running: boolean;
}

export interface DealDataDto {
	/** Сумма сделки (null для удаления) */
	dealAmount?: number;
	/** ID контактных лиц. Передать [] для отвязки всех контактов */
	contactPersonIds?: string[];
	/** ID организации. Передать null для отвязки организации */
	organizationId?: string;
	/** Кастомные поля CRM (fieldId -> value) */
	customFields?: Record<string, any>;
}

export interface CreateTaskDto {
	/** Название задачи */
	title: string;
	/** Id колонки родителя */
	columnId?: string;
	/** Описание задачи */
	description?: string;
	/** Задача перенесена в архив - да/нет */
	archived?: boolean;
	/** Задача выполнена - да/нет */
	completed?: boolean;
	/** Массив Id подзадач */
	subtasks?: string[];
	/** Массив Id пользователей, на которых назначена задача */
	assigned?: string[];
	/** Стикер "Дэдлайн". Указывает на крайний срок выполнения задачи. Имеется возможность кроме даты указать время, а так же дату начала задачи. */
	deadline?: Deadline;
	/** Стикер "Таймтрекинг". Используется для указания ожидаемого и реального времени на выполнение задачи. */
	timeTracking?: TimeTracking;
	/** Чеклисты. К задаче всегда будет присвоен переданный объект. Если необходимо внести изменения, нужно сначала получить чеклисты, затем произвести корректировку, а затем записать в задачу заново. */
	checklists?: CheckList[];
	/** Пользовательские стикеры. Передаются в виде объекта ключ-значение,
где ключ — ID стикера, значение — ID состояния для стикеров с состоянием или строка со значением для стикеров свободных полей.<br />
Для открепления стикера от задачи, используйте "-" как значение состояния.<br />
Для прикрепления пустого стикера (без состояния), используйте "empty" как значение состояния.<br />
Для стикеров типа "свободное текстовое поле" передавайте произвольную строку, например "ООО «Производство»".<br />
Для стикеров типа "свободное числовое поле" передавайте строку, содержащую число, например "123" или "345.123"; разделитель целой и дробной части — точка "." */
	stickers?: Record<string, any>;
	/** Цвет карточки задач на доске, доступны цвета: task-primary, task-gray, task-red, task-pink, task-yellow, task-green, task-turquoise, task-blue, task-violet */
	color?:
		| "task-primary"
		| "task-gray"
		| "task-red"
		| "task-pink"
		| "task-yellow"
		| "task-green"
		| "task-turquoise"
		| "task-blue"
		| "task-violet";
	/** ID задачи, сквозной через всю компанию */
	idTaskCommon?: string;
	/** ID задачи, внутри проекта */
	idTaskProject?: string;
	/** Стикер "Секундомер". Позволяет запустить секундомер, а так же ставить его на паузу и запускать заново. */
	stopwatch?: CreateStopwatch;
	/** Стикер "Таймер". Позволяет установить таймер на заданное время, а также возможность ставить его на паузу и запускать заново */
	timer?: CreateTimer;
	/** Данные для создания CRM сделки. Если указано, задача будет создана как сделка. */
	deal?: DealDataDto;
	/** Данные для работы расширения */
	extensionData?: Record<string, any>;
}

export interface UpdateDeadline {
	/** Timestamp дэдлайна */
	deadline?: number;
	/** Timestamp начала задачи */
	startDate?: number;
	/** Отображать на стикере время, или только дату */
	withTime?: boolean;
	/** История изменений дедлайна */
	history?: string[];
	/** Точки, которые блокируют дату дедлайна (Начало или Конец) */
	blockedPoints: string[];
	/** Связанные задачи */
	links: string[];
	/** Открепить стикер от задачи (true) */
	deleted?: boolean;
	/** Прикрепить стикер дедлайна без значения */
	empty?: boolean;
}

export interface UpdateTimeTracking {
	/** Сколько часов было запланировано на выполнение задачи */
	plan?: number;
	/** Сколько часов было затрачено на выполнение задачи */
	work?: number;
	/** Открепить стикер от задачи (true) */
	deleted?: boolean;
}

export interface UpdateTimer {
	/** Установить время таймера в секундах. */
	seconds?: number;
	/** Запустить или остановить таймер. */
	running?: boolean;
	/** Открепить стикер от задачи (true) */
	deleted?: boolean;
}

export interface UpdateStopwatch {
	/** Запустить или остановить секундомер */
	running?: boolean;
	/** Открепить стикер от задачи (true) */
	deleted?: boolean;
}

export interface UpdateTaskDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название задачи */
	title?: string;
	/** Id колонки родителя. Для удаления задачи из колонки использовать "-" */
	columnId?: string;
	/** Описание задачи */
	description?: string;
	/** Задача перенесена в архив - да/нет */
	archived?: boolean;
	/** Задача выполнена - да/нет */
	completed?: boolean;
	/** Массив Id подзадач */
	subtasks?: string[];
	/** Массив Id пользователей, на которых назначена задача */
	assigned?: string[];
	/** Стикер "Дэдлайн". Указывает на крайний срок выполнения задачи. Имеется возможность кроме даты указать время, а так же дату начала задачи. */
	deadline?: UpdateDeadline;
	/** Стикер "Таймтрекинг". Используется для указания ожидаемого и реального времени на выполнение задачи. */
	timeTracking?: UpdateTimeTracking;
	/** Чеклисты. К задаче всегда будет присвоен переданный объект. Если необходимо внести изменения, нужно сначала получить чеклисты, затем произвести корректировку, а затем записать в задачу заново. */
	checklists?: CheckList[];
	/** Пользовательские стикеры. Передаются в виде объекта ключ-значение,
где ключ — ID стикера, значение — ID состояния для стикеров с состоянием или строка со значением для стикеров свободных полей.<br />
Для открепления стикера от задачи, используйте "-" как значение состояния.<br />
Для прикрепления пустого стикера (без состояния), используйте "empty" как значение состояния.<br />
Для стикеров типа "свободное текстовое поле" передавайте произвольную строку, например "ООО «Производство»".<br />
Для стикеров типа "свободное числовое поле" передавайте строку, содержащую число, например "123" или "345.123"; разделитель целой и дробной части — точка "." */
	stickers?: Record<string, any>;
	/** Цвет карточки задач на доске, доступны цвета: task-primary, task-gray, task-red, task-pink, task-yellow, task-green, task-turquoise, task-blue, task-violet */
	color?:
		| "task-primary"
		| "task-gray"
		| "task-red"
		| "task-pink"
		| "task-yellow"
		| "task-green"
		| "task-turquoise"
		| "task-blue"
		| "task-violet";
	/** ID задачи, сквозной через всю компанию */
	idTaskCommon?: string;
	/** ID задачи, внутри проекта */
	idTaskProject?: string;
	/** Стикер "Таймер". Позволяет установить таймер на заданное время, а также возможность ставить его на паузу и запускать заново */
	timer?: UpdateTimer;
	/** Стикер "Секундомер". Позволяет запустить секундомер, а так же ставить его на паузу и запускать заново. */
	stopwatch?: UpdateStopwatch;
	/** Данные CRM сделки. Можно передавать для задач в CRM проектах для обновления суммы и/или кастомных полей. */
	deal?: DealDataDto;
	/** Данные для работы расширения */
	extensionData?: Record<string, any>;
}

export interface TaskChatSubscribersDto {
	/** Подписчики чата задачи */
	content?: string[];
}

export interface StringStickerStateDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID состояния стикера */
	id: string;
	/** Имя состояния стикера */
	name: string;
	/** Цвет состояния стикера */
	color?: string;
}

export interface StringStickerWithStatesListDtoBase {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя стикера */
	name: string;
	/** Иконка стикера */
	icon?:
		| ""
		| "star"
		| "heart"
		| "check"
		| "cloud"
		| "filter"
		| "alarm"
		| "bolt"
		| "bookmark"
		| "box"
		| "bulb"
		| "prio"
		| "code"
		| "ruble"
		| "dollar"
		| "euro"
		| "eye"
		| "flag"
		| "flame"
		| "history"
		| "info"
		| "key"
		| "anchor"
		| "message"
		| "movie"
		| "mnote"
		| "pencil"
		| "picture"
		| "pin"
		| "clockwise"
		| "clockwiseDot"
		| "rectangle"
		| "shield"
		| "stack"
		| "string"
		| "timeStop"
		| "design"
		| "user"
		| "plus"
		| "gear"
		| "sort"
		| "calendar";
	/** Состояния стикера. */
	states?: StringStickerStateDto[];
	/** Количество элементов, которые хочется получить. Максимум 1000. */
	limit?: number;
	/** Индекс первого элемента страницы */
	offset?: number;
}

export interface StringStickerWithStatesListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список текстовых стикеров компании */
	content: StringStickerWithStatesListDtoBase[];
}

export interface StringStickerWithStatesDto {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя стикера */
	name: string;
	/** Иконка стикера */
	icon?:
		| ""
		| "star"
		| "heart"
		| "check"
		| "cloud"
		| "filter"
		| "alarm"
		| "bolt"
		| "bookmark"
		| "box"
		| "bulb"
		| "prio"
		| "code"
		| "ruble"
		| "dollar"
		| "euro"
		| "eye"
		| "flag"
		| "flame"
		| "history"
		| "info"
		| "key"
		| "anchor"
		| "message"
		| "movie"
		| "mnote"
		| "pencil"
		| "picture"
		| "pin"
		| "clockwise"
		| "clockwiseDot"
		| "rectangle"
		| "shield"
		| "stack"
		| "string"
		| "timeStop"
		| "design"
		| "user"
		| "plus"
		| "gear"
		| "sort"
		| "calendar";
	/** Состояния стикера. */
	states?: StringStickerStateDto[];
	/** Количество элементов, которые хочется получить. Максимум 1000. */
	limit?: number;
	/** Индекс первого элемента страницы */
	offset?: number;
}

export interface StringStickerStateNoIdDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя состояния стикера */
	name: string;
	/** Цвет состояния стикера */
	color?: string;
}

export interface CreateStringStickerDto {
	/** Имя стикера */
	name: string;
	/** Иконка стикера */
	icon?:
		| ""
		| "star"
		| "heart"
		| "check"
		| "cloud"
		| "filter"
		| "alarm"
		| "bolt"
		| "bookmark"
		| "box"
		| "bulb"
		| "prio"
		| "code"
		| "ruble"
		| "dollar"
		| "euro"
		| "eye"
		| "flag"
		| "flame"
		| "history"
		| "info"
		| "key"
		| "anchor"
		| "message"
		| "movie"
		| "mnote"
		| "pencil"
		| "picture"
		| "pin"
		| "clockwise"
		| "clockwiseDot"
		| "rectangle"
		| "shield"
		| "stack"
		| "string"
		| "timeStop"
		| "design"
		| "user"
		| "plus"
		| "gear"
		| "sort"
		| "calendar";
	/** Состояния стикера. */
	states?: StringStickerStateNoIdDto[];
}

export interface UpdateStringStickerDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя стикера */
	name?: string;
	/** Иконка стикера */
	icon?:
		| ""
		| "star"
		| "heart"
		| "check"
		| "cloud"
		| "filter"
		| "alarm"
		| "bolt"
		| "bookmark"
		| "box"
		| "bulb"
		| "prio"
		| "code"
		| "ruble"
		| "dollar"
		| "euro"
		| "eye"
		| "flag"
		| "flame"
		| "history"
		| "info"
		| "key"
		| "anchor"
		| "message"
		| "movie"
		| "mnote"
		| "pencil"
		| "picture"
		| "pin"
		| "clockwise"
		| "clockwiseDot"
		| "rectangle"
		| "shield"
		| "stack"
		| "string"
		| "timeStop"
		| "design"
		| "user"
		| "plus"
		| "gear"
		| "sort"
		| "calendar";
}

export interface CreateStringStickerStateDto {
	/** Имя состояния стикера */
	name: string;
	/** Цвет состояния стикера */
	color?: string;
}

export interface WithStickerStateIdDto {
	/** ID состояния стикера */
	id: string;
}

export interface UpdateStringStickerStateDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя состояния стикера */
	name?: string;
	/** Цвет состояния стикера */
	color?: string;
}

export interface SprintStickerStateDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID состояния стикера */
	id: string;
	/** Имя состояния стикера */
	name: string;
	/** Дата начала спринта в секундах от 01.01.1970 */
	begin?: number;
	/** Дата окончания спринта в секундах от 01.01.1970 */
	end?: number;
}

export interface SprintStickerWithStatesListDtoBase {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя стикера */
	name: string;
	/** Состояния стикера. */
	states?: SprintStickerStateDto[];
}

export interface SprintStickerWithStatesListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список спринтовых стикеров компании */
	content: SprintStickerWithStatesListDtoBase[];
}

export interface SprintStickerWithStatesDto {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя стикера */
	name: string;
	/** Состояния стикера. */
	states?: SprintStickerStateDto[];
}

export interface SprintStickerStateNoIdDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя состояния стикера */
	name: string;
	/** Дата начала спринта в секундах от 01.01.1970 */
	begin?: number;
	/** Дата окончания спринта в секундах от 01.01.1970 */
	end?: number;
}

export interface CreateSprintStickerDto {
	/** Имя стикера */
	name: string;
	/** Состояния стикера. */
	states?: SprintStickerStateNoIdDto[];
}

export interface UpdateSprintStickerDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя стикера */
	name?: string;
}

export interface CreateSprintStickerStateDto {
	/** Имя состояния стикера */
	name: string;
	/** Дата начала спринта в секундах от 01.01.1970 */
	begin?: number;
	/** Дата окончания спринта в секундах от 01.01.1970 */
	end?: number;
}

export interface UpdateSprintStickerStateDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Имя состояния стикера */
	name?: string;
	/** Дата начала спринта в секундах от 01.01.1970 */
	begin?: number;
	/** Дата окончания спринта в секундах от 01.01.1970 */
	end?: number;
}

export interface GroupChatListDtoBase {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название чата */
	title: string;
	/** Сотрудники в чате */
	users: Record<string, any>;
	/** Роли сотрудников в чате */
	userRoleMap: Record<string, any>;
	/** Настройки ролей */
	roleConfigMap: Record<string, any>;
}

export interface GroupChatListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** Список чатов */
	content: GroupChatListDtoBase[];
}

export interface GroupChatDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID объекта */
	id: string;
	/** Название чата */
	title: string;
	/** Сотрудники в чате */
	users: Record<string, any>;
	/** Роли сотрудников в чате */
	userRoleMap: Record<string, any>;
	/** Настройки ролей */
	roleConfigMap: Record<string, any>;
}

export interface CreateGroupChatDto {
	/** Название чата */
	title: string;
	/** Сотрудники в чате */
	users: Record<string, any>;
	/** Роли сотрудников в чате */
	userRoleMap: Record<string, any>;
	/** Настройки ролей */
	roleConfigMap: Record<string, any>;
}

export interface UpdateGroupChatDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Название чата */
	title?: string;
	/** Сотрудники в чате */
	users?: Record<string, any>;
	/** Роли сотрудников в чате */
	userRoleMap?: Record<string, any>;
	/** Настройки ролей */
	roleConfigMap?: Record<string, any>;
}

export interface ChatMessageListDtoBase {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID сообщения, также является временем создания */
	id: number;
	/** ID автора сообщения */
	fromUserId: string;
	/** Текст сообщения */
	text: string;
	/** Текст сообщения в формате HTML */
	textHtml: string;
	/** Быстрая ссылка */
	label: string;
	/** Время последнего редактирования */
	editTimestamp: number;
	/** Реакции на сообщение */
	reactions: Record<string, any>;
}

export interface ChatMessageListDto {
	/** Дополнительная информация о странице */
	paging: PagingMetadata;
	/** История сообщений */
	content: ChatMessageListDtoBase[];
}

export interface CreateChatMessageDto {
	/** Текст сообщения */
	text: string;
	/** Текст сообщения в формате HTML */
	textHtml: string;
	/** Быстрая ссылка */
	label: string;
}

export interface ChatIdDto {
	/** ID сообщения, также является временем создания */
	id: number;
}

export interface ChatTypingDto {
	/** Идентификатор чата */
	chatId: string;
	/** Время последнего typing ping */
	typedAt: number;
}

export interface ChatMessageDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** ID сообщения, также является временем создания */
	id: number;
	/** ID автора сообщения */
	fromUserId: string;
	/** Текст сообщения */
	text: string;
	/** Текст сообщения в формате HTML */
	textHtml: string;
	/** Быстрая ссылка */
	label: string;
	/** Время последнего редактирования */
	editTimestamp: number;
	/** Реакции на сообщение */
	reactions: Record<string, any>;
}

export interface UpdateChatMessageDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	/** Быстрая ссылка */
	label?: string;
	/** Список реакций админа */
	react?: "👍" | "👎" | "👏" | "🙂" | "😀" | "😕" | "🎉" | "❤" | "🚀" | "✔";
}

export interface WebhookFilters {
	/** Название фильтра. Возможные значения: location, title, chat_message */
	name: any[];
	/** Значение фильтра. Для location - UUID или массив UUID, для title - regexp, для chat_message - regexp */
	value: string[];
}

export interface CreateWebhookDto {
	url: string;
	/** Событие подписки. Подписаться можно только на события в компании. Подписаться на личные чаты
не получится, потому что они не относятся к событиям в компании. Формат: `<тип_объекта>-<событие>`. Для
объектов `project,board,column,task,sticker,department,group_chat,chat_message`, возможные события: `created,deleted,restored,moved,renamed,updated`. Для объектов `user`,
возможные события: `added`, `removed`. Может использоваться javascript regexp как значение.
Например, `task-*` - подписка на все события по задачам, или `.*` - подписка на все события. */
	event: string;
	/** Дополнительные фильтры для вебхука */
	filters: WebhookFilters[];
}

export interface WebhookDto {
	/** ID объекта */
	id: string;
	/** Если true, значит объект удален */
	deleted?: boolean;
	url: string;
	/** Событие подписки. Подписаться можно только на события в компании. Подписаться на личные чаты
не получится, потому что они не относятся к событиям в компании. Формат: `<тип_объекта>-<событие>`. Для
объектов `project,board,column,task,sticker,department,group_chat,chat_message`, возможные события: `created,deleted,restored,moved,renamed,updated`. Для объектов `user`,
возможные события: `added`, `removed`. Может использоваться javascript regexp как значение.
Например, `task-*` - подписка на все события по задачам, или `.*` - подписка на все события. */
	event: string;
	/** Если true, то вызываться не будет */
	disabled?: boolean;
	/** Время последнего успешного вызова */
	lastSuccess?: number;
	/** Количество неуспешных вызовов. Сбрасывается до 0 при любом успешном вызове */
	failuresSinceLastSuccess: number;
	/** Дополнительные фильтры для вебхука */
	filters: WebhookFilters[];
}

export interface UpdateWebhookDto {
	/** Если true, значит объект удален */
	deleted?: boolean;
	url?: string;
	/** Событие подписки. Подписаться можно только на события в компании. Подписаться на личные чаты
не получится, потому что они не относятся к событиям в компании. Формат: `<тип_объекта>-<событие>`. Для
объектов `project,board,column,task,sticker,department,group_chat,chat_message`, возможные события: `created,deleted,restored,moved,renamed,updated`. Для объектов `user`,
возможные события: `added`, `removed`. Может использоваться javascript regexp как значение.
Например, `task-*` - подписка на все события по задачам, или `.*` - подписка на все события. */
	event?: string;
	/** Если true, то вызываться не будет */
	disabled?: boolean;
	/** Дополнительные фильтры для вебхука */
	filters?: WebhookFilters[];
}

export interface CreateContactPersonDto {
	/** ID CRM проекта, где создаётся контакт */
	projectId: string;
	/** Имя/название контактного лица */
	title: string;
	/** Поля контактного лица */
	fields?: {
		position?: string;
		phone?: string;
		additionalPhone?: string;
		email?: string;
		address?: string;
	};
}

export interface ContactPersonEntryDto {
	/** ID контактного лица */
	id: string;
	/** Имя/название контактного лица */
	title: string;
	/** Статус удаления записи */
	deleted?: boolean;
	/** Время создания контакта */
	timestamp?: number;
	/** ID пользователя, создавшего запись */
	createdBy?: string;
	/** Поля контактного лица */
	fields?: {
		position?: string;
		phone?: string;
		additionalPhone?: string;
		email?: string;
		address?: string;
	};
}

export interface CrmDirectoryEntryDto {
	/** ID сущности */
	id: string;
	/** Название */
	title: string;
	/** Статус удаления записи */
	deleted?: boolean;
	/** Время создания */
	timestamp?: number;
	/** ID пользователя, создавшего запись */
	createdBy?: string;
	/** Дополнительные поля */
	fields?: Record<string, any>;
}
