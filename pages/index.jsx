// This page can can be pre-rendered without
// external data: It will be pre-rendered
// into a HTML file at build time.

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-4xl font-bold">Next JS: Server-side Rendering vs Static Generation vs Client-side</h1>

      <h2> <b>Home page: </b> Static Generation without Data</h2>
      <h2> <b>All Products page: </b> Server-side Generation with Data (SSR)</h2>
      <h2> <b>Product Detail page: </b> Static Generation with Data (SSG)</h2>
      <h2> <b>Cart page: </b> Static Generation without Data, Combined with Client-side Fetching</h2>
    </div>
  )
}

export default HomePage