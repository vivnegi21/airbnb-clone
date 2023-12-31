import React, { useEffect, useState } from 'react'
import { trashIcon, uploadIcon } from '../assets'
import Perks from './Perks';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
const PlacesForm = () => {
    const { id } = useParams();
    if (id) {
        document.title = "Edit Place"
    } else {
        document.title = "Add New Place"
    }

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setextraInfo] = useState("");
    const [checkIn, setcheckIn] = useState("");
    const [checkOut, setcheckOut] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [pricePerNight, setpricePerNight] = useState("");
    const [maxGuests, setmaxGuests] = useState("");
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (id) {
            // eslint-disable-next-line no-undef
            axios.get(`/places/${id}`)
                .then((res) => {
                    const data = res.data;
                    setTitle(data.title);
                    setAddress(data.address);
                    setDescription(data.description);
                    setPerks(data.perks);
                    setextraInfo(data.extraInfo);
                    setcheckIn(data.checkIn);
                    setcheckOut(data.checkOut);
                    setpricePerNight(data.price_per_night);
                    setmaxGuests(String(data.maxGuests));
                    setAddedPhotos(data.photos);
                });
        }
    }, []);
    const navigate = useNavigate();
    async function handleSubmit(ev) {

        ev.preventDefault();

        const placeData = {
            title: title,
            address: address,
            description: description,
            perks: perks,
            extraInfo: extraInfo,
            checkIn: checkIn,
            checkOut: checkOut,
            addedPhotos: addedPhotos,
            price_per_night: Number(pricePerNight),
            maxGuests: Number(maxGuests),
        };

        if (id) {
            axios.put('/places', { id, ...placeData }).then(() => {
                //redirect to accoint/places
                navigate('/account/places');
            })
        } else {
            axios.post('/places', placeData).then(() => {
                //redirect to accoint/places
                navigate('/account/places');
            })
        }


    }
    function labelHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    function labelDesc(text) {
        return (
            <h2 className='text-sm text-gray-500'>{text}</h2>
        )
    }
    function labelInput(header, description) {
        return (
            <>
                {labelHeader(header)}
                {labelDesc(description)}
            </>
        )
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data } = await axios.post('/uploadByLink', { link: url });
        setAddedPhotos(prev => [...prev, data]);
        setUrl("");
    }
    function uploadChange(ev) {
        ev.preventDefault();
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'mutlipart/form-data' }
        }).then((res) => {
            setAddedPhotos([...addedPhotos, ...res.data])
        })
    }

    function removePhoto(photo) {
        setAddedPhotos([...addedPhotos.filter(file => file !== photo)]);
    }

    return (
        <div className='md:w-2/3 mx-auto'>
            <form action="" onSubmit={handleSubmit}>
                {labelInput("Title", "Title for your place. should be short and catchy as in advertisement")}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, for example:My lovely apartment' />

                {labelInput('Address', 'Address to this place')}
                <input type="text" name='address' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='places' />

                {labelInput('Photos', 'add photos of the place')}
                <div className='flex gap-2'>
                    <input type="text" placeholder='add using a link .....jpg' value={url} onChange={ev => setUrl(ev.target.value)} />
                    <button className='bg-gray-300 whitespace-nowrap px-4 rounded-2xl' onClick={addPhotoByLink}>Add photo</button>
                </div>

                <div className='mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                    {addedPhotos.length > 0 && addedPhotos.map((photo, id) => (
                        <div className='relative flex h-32 hover:scale-[200%]  hover:ease-in duration-500 hover:z-10 delay-200' key={id}>
                            <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + photo} alt="id" key={id} className='rounded-2xl object-cover ' />
                            <div className='absolute bottom-1 right-1 cursor-pointer' onClick={() => removePhoto(photo)}>
                                <img src={trashIcon} alt="delete" className='h-6 w-6 bg-white bg-opacity-50 rounded-xl' />
                            </div>
                        </div>
                    ))}
                    <label className='flex gap-1 items-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 justify-center cursor-pointer'>
                        <img src={uploadIcon} alt=" upload" className='w-8 h-8' />
                        <span>Upload</span>
                        <input type="file" multiple name="avatar" id="avatar" accept='image/*' className='hidden' onChange={uploadChange} />
                    </label>
                </div>

                {labelInput('Description', 'description of the place')}
                <textarea name="description" value={description} onChange={ev => setDescription(ev.target.value)} cols="10" rows="5" />

                {labelInput('Perks', 'select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks} />
                {labelInput('Extra info', 'house rules, etc')}
                <textarea name="extraInfo" value={extraInfo} onChange={ev => setextraInfo(ev.target.value)} cols="30" rows="5" />

                {labelInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
                    <div>
                        <h3 className="mt-2 -b-1">
                            Check in Time
                        </h3>
                        <input type="text" value={checkIn} onChange={ev => setcheckIn(ev.target.value)} placeholder='14:00' />
                    </div>
                    <div>
                        <h3 className="mt-2 -b-1">
                            Check Out Time
                        </h3>
                        <input type="text" name='checkOut' placeholder='11' value={checkOut} onChange={ev => setcheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -b-1">
                            Max number of guests
                        </h3>
                        <input type="text" name='maxGuests' placeholder='1' value={maxGuests} onChange={ev => setmaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -b-1">
                            Price per nights
                        </h3>
                        <input type="text" name='pricePerNight' placeholder='100' value={pricePerNight} onChange={ev => setpricePerNight(ev.target.value)} />
                    </div>
                </div>
                <button className='primary my-4'>
                    {document.title}
                </button>
            </form>
        </div>
    )
}

export default PlacesForm