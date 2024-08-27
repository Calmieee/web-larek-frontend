# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Базовые интерфейсы и типы данных

###  Model
| IProductList`<T>`| 
|----------|
| total: `number`| 
| items: `T[]`|

| IProductItem | 
|--------------|
| id: `string` | 
| description: `string` | 
| image: `string` | 
| title: `string` | 
| category: `string` | 
| price: `number` | 


| IBasket | 
|--------------|
| BasketList: `Record<string, number>` | 
| countProductItemInList: `number` | 
| _totalPrice(): `number` | 
| appendProduct(id: `string`): `void` | 
| removeProduct(id: `string`): `void` | 


| IOrderDetails | 
|--------------|
| payment: `string` | 
| email: `string` | 
| phone: `string` | 
| address: `string` | 
| total: `number` | 
| items: `string[]` | 
|setOrderDetails(details: `{}`): `{}`|

### API

| HandleResponce | 
|------------|
| handleResponce(response: `Response`):`Promise<object>`|

| Api`<T extends object>` extends HandleResponce | 
|--------------|
| baseUrl: `string` | 
| headers: `T` | 
| get(uri: `string`): `handleResponce` | 
| post(uri: `string`, data: `object`, method: `apiPostMethods`): `handleResponce` | 



| ErrorState | 
|------------|
| error: `string` | 

| ApiPostMethods |
|----------------|
| `POST` |
| `PUT` |
| `DELETE` |


### View 

| IView`<T, S = object>` | 
|------------------------|
| element: `HTMLElement` | 
| copy(settings?: `S`): `IView<T>` | 
| render(data?: `Partial<T>`): `HTMLElement` | 

| IViewConstructor`<T, S>` | 
|--------------------------|
| new(root: `HTMLElement`, settings: `S`): `IView<T>` | 

| ClickableEvent`<T>` |
|----------------------|
| `{ event: MouseEvent; item?: T }` |

| IClickable`<T>` | 
|-----------------|
| onClick: (args: `IClickableEvent<T>`): `void` | 

| ChangeableEvent`<T>` |
|-----------------------|
| `{ event: Event; value?: T }` |

| IChangeable`<T>` | 
|------------------|
| onChange: (args: `IChangeableEvent<T>`): `void` | 

| SelectableEvent`<T>` |
|-----------------------|
| `{ event: Event; value?: T }` |

| ISelectable`<T>` | 
|------------------|
| onSelect: (args: `ISelectableEvent<T>`): `void` |
