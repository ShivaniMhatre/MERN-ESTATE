import { useState } from "react"
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        desc: '',
        address: '',
        type: 'rent',
        bedroom: 1,
        bathroom: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    console.log(formData)
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((err) => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress)
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must upload at least one image')
            if (formData.regularPrice < formData.discountPrice) return setError('Discount Price must be lesser than Rugular Price')
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            })

            const data = res.json();
            setLoading(false)
            if (data.success === false) {
                setError(data.message)
            }
            console.log(data)
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return (
        <main className="p-3 max-w-4xl mx-auto" >
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name"
                        maxLength='62'
                        minLength='10'
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        id="desc"
                        required
                        onChange={handleChange}
                        value={formData.desc}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address"
                        required
                        onChange={handleChange}
                        value={formData.addrsss}
                    />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='sale'
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='rent'
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'rent'}

                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='furnished'
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='offer'
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bedroom"
                                min="1"
                                max="10"
                                required
                                className="p-3 rounded-lg border border-gray-300"
                                onChange={handleChange}
                                value={formData.bedroom}
                            />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bathroom"
                                min="1"
                                max="10"
                                required
                                className="p-3 rounded-lg border border-gray-300"
                                onChange={handleChange}
                                value={formData.bathroom}
                            />
                            <p>Bath Rooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="regularPrice"
                                min="50"
                                max="100000"
                                required
                                className="p-3 rounded-lg border border-gray-300"
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs">(₹/month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="discountPrice"
                                    min="0"
                                    max="100000"
                                    required
                                    className="p-3 rounded-lg border border-gray-300"
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <p>Discount Price</p>
                                    <span className="text-xs">(₹/month)</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">Images:
                        <span className="font-normal text-gray-600 ml-2">The First Image Will Be The Cover</span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            className="p-3 border rounded-lg border-gray-300 w-full"
                        />
                        <button
                            onClick={handleImageSubmit}
                            className="p-3 text-green-700 border border-green-700 
                          rounded-lg uppercase hover:shadow-lg disabled:opacity:80 "
                            disabled={uploading}>
                            {uploading ? 'Uploading...' : "Upload"}
                        </button>
                    </div>
                    <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>

                    {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div className="flex justify-between p-3 border items-center" key={url}>
                            <img src={url} alt='list' className="w-20 h-20 object-contain rounded-lg" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-700 p-3 rounded-lg uppercase hover:opacity-75">Delete</button>
                        </div>

                    ))
                    }
                    <button disabled={loading || uploading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        {loading ? 'Creating....' : 'Crate Listing '}
                    </button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div>

            </form>
        </main >
    )
}