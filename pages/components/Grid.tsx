export default function GridGalleryCard({imageUrl}: {imageUrl: string})   {
    return (
        <div className='relative transition ease-out duration-300 transform'>
      <div className="absolute inset-0 z-10 flex transition duration-200 ease-out hover:opacity-90">
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20"></div>
      </div>
      <img src={imageUrl}  />
    </div>
    )
}