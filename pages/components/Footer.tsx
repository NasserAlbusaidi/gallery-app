

export default function Footer() {
    return (
        <footer className=" sticky top-[100vh] p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 ">
            <div className=" mx-auto grid grid-cols-4 sm:grid-cols-10 ">
    <span className=" col-start-2 col-end-5 sm:col-start-3 sm:col-end-10 text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com" className="hover:underline"> by Nasser Albusaidi</a>.</span>
            </div>     
</footer>
    );
}