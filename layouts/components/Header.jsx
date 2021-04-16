import Link from 'next/link'

const Header = (props) => {
  return (
    <header className="fixed top-0 z-10 w-full bg-green-500">
      <div className="container flex py-2 mx-auto">
        <h1 className="mx-4 text-2xl font-bold">Header</h1>

        <ul className="flex mx-auto">
          <li className="flex p-2">
            <Link href='/'>
              <a className="flex items-center justify-center w-full font-bold hover:text-white" >
                Home
              </a>
            </Link>
          </li>
          <li className="flex p-2">
            <Link href='/products'>
              <a className="flex items-center justify-center w-full font-bold hover:text-white" >
                Products
              </a>
            </Link>
          </li>
          <li className="flex p-2">
            <Link href='/cart'>
              <a className="flex items-center justify-center w-full font-bold hover:text-white" >
                Cart
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header