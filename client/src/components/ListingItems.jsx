
import { Link } from "react-router-dom"
import { MdLocationOn } from 'react-icons/md';


export default function ListingItems({ listing }) {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/listing/${listing._id}`}>
                <img
                    src={listing.imageUrls[0]}
                    alt="lisig img"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="text-lg font-semibold text-slate-700  truncate">{listing.name}</p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-700" />
                        <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{listing.desc}</p>
                    {/*  */}
                    <p className="text-slate-500 mt-2 font-semibold">
                        ₹ {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && '/month'}
                    </p>
                    <div className="text-slate-700 flex gap-2">
                        <div className="font-bold text-xs">
                            {listing.bedroom > 1 ? `${listing.bedroom} beds` : `${listing.bedroom} beds`}
                        </div>
                        <div className="font-bold text-xs">
                            {listing.bathroom > 1 ? `${listing.bathroom} baths` : `${listing.bathroom} baths`}
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}