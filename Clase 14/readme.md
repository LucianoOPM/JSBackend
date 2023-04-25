Mongosh

# Mongosh Schema

Estandarisaremos un schema para que el documento de la base de datos, acepte unicamente un formato de objetos y que en caso de que el objeto no cumpla con los requerimientos no acepte el objeto.

## API Reference

#### Get all items

```http
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
