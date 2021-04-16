# <h1 align="center" style="font-weight: bold; margin-top: 20px; margin-bottom: 20px;">NextJS: Server-side Rendering vs Static Generation vs Client-side</h1>
  
<h3 align="center" style="font-weight: bold; margin-top: 20px; margin-bottom: 20px;">Guide using SSR-SSG-Client side in Next JS</h3>
  
<p align="center">
  <a href="https://github.com/tampm92/tp-nextjs-ssr-vs-ssg-vs-client-side"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/tampm92/tp-nextjs-ssr-vs-ssg-vs-client-side/build"></a>
  <a href="#last-commit"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tampm92/tp-nextjs-ssr-vs-ssg-vs-client-side"></a>
  <a href="#node-current"><img alt="node-current" src="https://img.shields.io/node/v/next"></a>
  <a href="#license"><img alt="GitHub" src="https://img.shields.io/github/license/tampm92/tp-nextjs-ssr-vs-ssg-vs-client-side"></a>
</p>
  
<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#support">Need Help?</a> •
  <a href="#about">About</a> •
  <a href="#license">License</a>
</p>
  
<br/>

## Introduction

1. Understand `SSR` - `SSG` - `Client-side` in **Next JS**.
2. Example project
  
<br/>
  
## Key Features

- **[Next JS](https://nextjs.org/docs/getting-started)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Setup Tailwind for NextJS](https://blog.tampm.com/posts/tp-next-js-setup)**

<br/>
  
## Usage

```sh
# install libs
yarn
# run dev
yarn dev
# run prod
yarn build
yarn start
```

<br/>
  
## Getting Started

### **Structure**

```js
.
├── 📁 assets
│   ├── 📁 styles
│   │   ├── 📝 tailwind.css
│   │   └── 📝 globals.scss
│   └── 📁 images
├── 📁 components
│   ├── 📁 common
│   └── 📁 partials
├── 📁 layouts
│   ├── 📁 components
│   └── 📝 default.jsx
├── 📁 pages
│   ├── 📁 api
│   ├── 📁 products
│   ├── 📝 _app.jsx
│   ├── 📝 index.jsx
│   └── 📝 cart.jsx
├── 📁 public
├── 📁 shared
│   ├── 📁 contexts
│   │   └── 📝 GlobalContext.js
│   ├── 📝 config.js
│   └── 📝 fetcher.js
├── 📝 .env
├── 📝 .env.development
├── 📝 .env.production
├── 📝 jsconfig.js
├── 📝 next.config.js
├── 📝 postcss.config.js
├── 📝 tailwind.config.js
└── 📝 README.md
```

<br/>

### **Prerequisites**

- [Node.js](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/getting-started/install)

## Documentation

### **Understand - Use cases**

- Server-side Rendering (SSR)
    - Next.js pre-renders the page into HTML on the server on every request. [TTFB](https://web.dev/time-to-first-byte/) (Time to first byte) is slower, but your data is always up-to-date.
    - You want hide real backend/api

- Static Generation (SSG)
    - Next.js pre-renders the page into HTML on the server ahead of each request, such as at build time. The HTML can be globally cached by a CDN and served instantly.
    - Static Generation is more performant, but because pre-rendering happens ahead of time, the data could become stale at request time.

- Client-side Fetching
    - Statically generate parts of the page without data, and fetch the data on the client-side.

Fortunately, there are ways to work around this issue without rebuilding the entire app when the data is updated. With Next.js, you can use Static Generation for maximum performance without sacrificing the benefits of Server-side Rendering.

In particular, you can use:

- Incremental Static Generation: Add and update statically pre-rendered pages incrementally after build time.
- Client-side Fetching: Statically generate parts of the page without data, and fetch the data on the client-side.
To demonstrate, let’s use a hypothetical e-commerce Next.js app as an example.

### **Setup project**

- See [here](https://blog.tampm.com/posts/tp-next-js-setup)

### **App Example**

- Home page: This page shows the company information, which will be written directly in the app’s source code. No need to fetch data.
- All Products page: This page shows the list of all products. The data will be fetched from a database. This page alway need data is always up-to-date. (stock/status). This page will look the same for all users.
- Product Detail page: This page shows each individual product. Like the All Products page, the data will be fetched from a database, and each page will look the same for all users.
- Cart page: This page shows a user’s shopping cart. The data will be fetched from a database. This page will look different for each user.

#### Home page: Static Generation without Data

- If a page does not require fetching external data, it will automatically pre-render into HTML at build time. This is the default for Next.js pages. Let’s use this for the about page, which has no data requirements.
- Create a file under the pages directory and export only the component.

```jsx
// This page can can be pre-rendered without
// external data: It will be pre-rendered
// into a HTML file at build time.

const HomePage = () => {
  return (
    <>
      Home Page
    </>
  )
}

export default HomePage
```

#### All Products page: Server-side Generation with Data

This page need data is always up-to-date. So you can chose 2 options:

- SSR (chose this if you don't want show backend/api)
- Client-side fetching (for better performance)

Below example. I chose SSR

```jsx
// The page component receives products prop
// from getServerSideProps
import Link from 'next/link'

import fetcher from '@/shared/fetcher'

const ProductsPage = ({ products }) => {
  return (
    <>
      <h1>Products</h1> 
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  )
}

export default ProductsPage

// This function runs at build time on the build server
export async function getServerSideProps() {
  const products = await fetcher('http://localhost:3000/api/products')
  return {
    props: {
      products
    }
  }
}
```

#### Product Detail page: Static Generation with Data

Your e-commerce app needs a page for each product with a route based on its id (for example, /products/[slug]).

In Next.js, this can be done at build time using [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) and `getStaticPaths`. By creating a file called products/[slug].js and having `getStaticPaths` return all possible `slugs`, you can pre-render all individual product pages at `build time`.

Then, you can fetch data for the individual product from the database. We can use `getStaticProps` again by providing the id at build time.

```jsx
// The page component receives products prop
// from getStaticProps
import { useRouter } from 'next/router'

import fetcher from '@/shared/fetcher'

const ProductDetailPage = ({ product }) => {
  const router = useRouter()

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render product...
}

export default ProductDetailPage

export async function getStaticPaths() {
  // fallback: true means that the missing pages
  // will not 404, and instead can render a fallback.
  return { 
    paths: [],
    fallback: true 
  }
}

export async function getStaticProps({ params }) {
  const product = await fetcher(`http://localhost:3000/api/products/${params.slug}`)
  return {
    props: {
      product
    },
    revalidate: 60
  }
}
```

Incremental Static Generation: This allows you to use Static Generation for maximum performance without sacrificing the benefits of Server-side Rendering.

Adding Pages (Fallback): To enable this behavior, you can specify fallback: true in `getStaticPaths`. Then, in the page itself, you can use `router.isFallback` to see if the loading indicator should be displayed.

Updating Existing Pages: This approach is called Incremental Static Regeneration. To enable this, you can specify revalidate: `60` in `getStaticProps`.

#### Shopping Cart page: Static Generation without Data, Combined with Client-side Fetching

You might think this is when you opt for Server-side Rendering, but that’s not necessarily the case. Instead, for better performance, you can do Client-side Fetching on top of Static Generation without data:

- Pre-render the page without data and show a loading state. (Static Generation)
- Then, fetch and display the data client-side. (Client-side Fetching)

```jsx
// The page component receives products
// from fetching on client
import useSWR from 'swr'
import Link from 'next/link'

import fetcher from '@/shared/fetcher'

const CartPage = ({}) => {
  // fetchAPI is the function to do data fetching
  const { data: products, error } = useSWR('/api/cart', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>Items in Cart: {data.products.length}</div>
}

export default CartPage
```

### **Performance and testing**

Any of testing activities and reports goes here.

<br/>

## Support
  
### **Get Help**
  
**You have a question or problem wasn't solved?** No worries! Just open up a new issue in the `GitHub issue tracker`. Please provide all information to reproduce your problem. If you don't have a GitHub account, you can [contact](#contact) me directly.
  
<br/>
  
## About

### **Known Issues**
  
 - none (that are reported)

<br/>
  
### **Contact**
  
If you haven't done so already, please check out [Get Help](#get-help) for the fastest possible help on your issue. Alternatively you can get in touch with me by:

- Email: tampm920810@gmail.com
  
<br/>

## License

This project is proudly licensed under the [MIT license][git-license].

<!-- LINKS -->
<!-- in-line references: websites -->
[tampm.com]:https://tampm.com

<!-- in-line references to github -->

[git-profile]:https://github.com/tampm92
[git-readme]:README.md
[git-license]:LICENSE.md