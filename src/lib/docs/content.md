# Epic Games API (Unofficial)

A simple and unofficial API for Epic Games. This is a work-in-progress and only some endpoints are implemented.

-   **Note:** This API is not affiliated with Epic Games.
-   **Note:** This API is not intended to be used for spamming or scraping.
-   **Note:** This API is not intended to be used for commercial purposes or real-world applications.

## Rate Limiting

Rate limiting is currently set to **2** requests per **500ms**.

If you go over the rate limit you will receive a **429** response with the [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header.

The `Retry-After` header will tell you (in seconds) how long you should wait before making another request. For example, if you receive a `Retry-After` header of `"2"` then you should wait **2** seconds before making another request.

-   Body: `"Rate Limited"`
-   Status: `429`
-   Status Text: `"Too Many Requests"`
-   Headers:
    -   `"Retry-After"`

## Endpoints

Base URL: `https://epicgamesapi.vercel.app/api`.

### Products

#### 🔷 GET `/products`

Get a list of all Products.

#### Query Parameters

##### 🔶 `search`

Search products by using a search query to filter them by Title or Description.

-   Optional: `true`
-   Type: `string`
-   Example: `"https://epicgamesapi.vercel.app/api/products?search=Gun"`

##### 🔶 `minPrice`

Filter products by using a minimum price.

-   Optional: `true`
-   Type: `number`
-   Minimum: `0`
-   Example: `"https://epicgamesapi.vercel.app/api/products?minPrice=100"`

##### 🔶 `maxPrice`

Filter products by using a maximum price.

-   Optional: `true`
-   Type: `number`
-   Minimum: `0`
-   Example: `"https://epicgamesapi.vercel.app/api/products?maxPrice=100"`

##### 🔶 `minDiscount`

Filter products by using a minimum discount.

-   Optional: `true`
-   Type: `number`
-   Minimum: `0`
-   Example: `"https://epicgamesapi.vercel.app/api/products?minDiscount=100"`

##### 🔶 `maxDiscount`

Filter products by using a maximum discount.

-   Optional: `true`
-   Type: `number`
-   Minimum: `0`
-   Example: `"https://epicgamesapi.vercel.app/api/products?maxDiscount=100"`

##### 🔶 `tagIds`

Filter products by using a comma-separated list of Tag IDs.

-   Optional: `true`
-   Type: `string`. Comma-separated list of Tag IDs (IDs with minimum value of `1`).
-   Example: `"https://epicgamesapi.vercel.app/api/products?tagIds=1,2,3"`

##### 🔶 `start`

Start the search at a specific index.

-   Optional: `true`
-   Type: `number`
-   Default: `0`
-   Minimum: `0`
-   Example: `"https://epicgamesapi.vercel.app/api/products?start=10"`

##### 🔶 `limit`

Limit the number of results to be returned.

-   Optional: `true`
-   Type: `number`
-   Default: `10`
-   Minimum: `1`
-   Maximum: `100`
-   Example: `"https://epicgamesapi.vercel.app/api/products?limit=10"`

##### Response

-   Body: `Product[]`
-   Status: `200`

###### Example

🔷 GET `"https://epicgamesapi.vercel.app/api/products"`

```json
[
    {
        "id": 1,
        "slug": "blasphemous-2",
        "title": "Blasphemous 2",
        "description": "The Penitent One awakens as Blasphemous 2 joins him once again in an endless struggle against The Miracle. Dive into a perilous new world filled with mysteries and secrets to discover.",
        "image": {
            "tall": "https://cdn1.epicgames.com/offer/c2890856ddb844f1a7d552fc929838a7/EGS_Blasphemous2_TheGameKitchen_S2_1200x1600-06855277692f2ef37230f8dbc8cf0df7_1200x1600-06855277692f2ef37230f8dbc8cf0df7",
            "wide": "https://cdn1.epicgames.com/offer/c2890856ddb844f1a7d552fc929838a7/EGS_Blasphemous2_TheGameKitchen_S1_2560x1440-12672e8bbe1c508efc9a7c6a871421ec_2560x1440-12672e8bbe1c508efc9a7c6a871421ec"
        },
        "price": 2999,
        "discount": 0,
        "tags": [1, 45, 56, 3, 12, 23]
    }
]
```

##### Errors

###### 400 Bad Request

-   Body: `string`
-   Status: `400`
-   Status Text: `"Bad Request"`

#### 🔷 GET `/products/id/:id`

Get a single Product by ID.

-   Type: `number`

##### Response

-   Body: `Product`
-   Status: `200`

###### Example

🔷 GET `"https://epicgamesapi.vercel.app/api/products/id/1"`

```json
{
    "id": 1,
    "slug": "blasphemous-2",
    "title": "Blasphemous 2",
    "description": "The Penitent One awakens as Blasphemous 2 joins him once again in an endless struggle against The Miracle. Dive into a perilous new world filled with mysteries and secrets to discover.",
    "image": {
        "tall": "https://cdn1.epicgames.com/offer/c2890856ddb844f1a7d552fc929838a7/EGS_Blasphemous2_TheGameKitchen_S2_1200x1600-06855277692f2ef37230f8dbc8cf0df7_1200x1600-06855277692f2ef37230f8dbc8cf0df7",
        "wide": "https://cdn1.epicgames.com/offer/c2890856ddb844f1a7d552fc929838a7/EGS_Blasphemous2_TheGameKitchen_S1_2560x1440-12672e8bbe1c508efc9a7c6a871421ec_2560x1440-12672e8bbe1c508efc9a7c6a871421ec"
    },
    "price": 2999,
    "discount": 0,
    "tags": [1, 45, 56, 3, 12, 23]
}
```

##### Errors

###### 404 Not Found

-   Body: `"Product Not Found"`
-   Status: `404`
-   Status Text: `"Not Found"`

###### 400 Bad Request

-   Body: `string`
-   Status: `400`
-   Status Text: `"Bad Request"`

#### 🔷 GET `/products/slug/:slug`

-   Type: `string`

Get a single Product by Slug.

##### Response

-   Body: `Product`
-   Status: `200`

###### Example

🔷 GET `"https://epicgamesapi.vercel.app/api/products/slug/blasphemous-2"`

```json
{
    "id": 1,
    "slug": "blasphemous-2",
    "title": "Blasphemous 2",
    "description": "The Penitent One awakens as Blasphemous 2 joins him once again in an endless struggle against The Miracle. Dive into a perilous new world filled with mysteries and secrets to discover.",
    "image": {
        "tall": "https://cdn1.epicgames.com/offer/c2890856ddb844f1a7d552fc929838a7/EGS_Blasphemous2_TheGameKitchen_S2_1200x1600-06855277692f2ef37230f8dbc8cf0df7_1200x1600-06855277692f2ef37230f8dbc8cf0df7",
        "wide": "https://cdn1.epicgames.com/offer/c2890856ddb844f1a7d552fc929838a7/EGS_Blasphemous2_TheGameKitchen_S1_2560x1440-12672e8bbe1c508efc9a7c6a871421ec_2560x1440-12672e8bbe1c508efc9a7c6a871421ec"
    },
    "price": 2999,
    "discount": 0,
    "tags": [1, 45, 56, 3, 12, 23]
}
```

##### Errors

###### 404 Not Found

-   Body: `"Product Not Found"`
-   Status: `404`
-   Status Text: `"Not Found"`

###### 400 Bad Request

-   Body: `string`
-   Status: `400`
-   Status Text: `"Bad Request"`

### Tags

#### 🔷 GET `/tags`

Get a list of all Tags.

#### Query Parameters

##### 🔶 `search`

Search tags by using a search query to filter them by Name.

-   Optional: `true`
-   Type: `string`
-   Example: `"https://epicgamesapi.vercel.app/api/tags?search=Action"`

##### 🔶 `groups`

Search for Tags by a spesific group name. Example: `"genre"`, `"platform"`.

-   Optional: `true`
-   Type: `string`
-   Example: `"https://epicgamesapi.vercel.app/api/tags?groups=genre,feature,platform"`

##### Response

-   Body: `Tag[]`
-   Status: `200`

###### Example

🔷 GET `"https://epicgamesapi.vercel.app/api/tags"`

```json
[
    {
        "id": 1,
        "name": "Action",
        "slug": "action",
        "group": "genre"
    },
    {
        "id": 28,
        "name": "Multiplayer",
        "slug": "multiplayer",
        "group": "feature"
    },
    {
        "id": 56,
        "name": "Windows",
        "slug": "windows",
        "group": "platform"
    }
]
```

##### Errors

###### 400 Bad Request

-   Body: `string`
-   Status: `400`
-   Status Text: `"Bad Request"`

#### 🔷 GET `/tags/id/:id`

Get a single Tag by ID.

-   Type: `number`

##### Response

-   Body: `Tag`
-   Status: `200`

###### Example

🔷 GET `"https://epicgamesapi.vercel.app/api/tags/id/1"`

```json
{
    "id": 1,
    "name": "Action",
    "slug": "action",
    "group": "genre"
}
```

##### Errors

###### 404 Not Found

-   Body: `"Tag Not Found"`
-   Status: `404`
-   Status Text: `"Not Found"`

###### 400 Bad Request

-   Body: `string`
-   Status: `400`
-   Status Text: `"Bad Request"`

#### 🔷 GET `/tags/slug/:slug`

Get a single Tag by Slug.

-   Type: `string`

##### Response

-   Body: `Tag`
-   Status: `200`

###### Example

🔷 GET `"https://epicgamesapi.vercel.app/api/tags/slug/action"`

```json
{
    "id": 1,
    "name": "Action",
    "slug": "action",
    "group": "genre"
}
```

##### Errors

###### 404 Not Found

-   Body: `"Tag Not Found"`
-   Status: `404`
-   Status Text: `"Not Found"`

###### 400 Bad Request

-   Body: `string`
-   Status: `400`
-   Status Text: `"Bad Request"`

## Types

### `Product`

```ts
{
    id: number
    slug: string
    title: string
    description: string
    image: {
        tall: string
        wide: string
    }
    price: number
    discount: number
    tags: Tag["id"][]
}
```

### `Tag`

```ts
{
    id: number
    name: string
    slug: string
    group: string
}
```
