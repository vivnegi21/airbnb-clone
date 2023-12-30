import React from 'react'
import { carIcon, petIcon, privateIcon, radioIcon, tvIcon, wifiIcon } from '../assets'

const Perks = ({selected,onChange}) => {
    function onCbChange(ev){
        // ev.preventDefault();
        const {name,checked} = ev.target;
        if(checked) onChange([...selected,name]);
        else onChange([...selected.filter(val=>val!==name)]);
        //  onChange([...selected,ev.target.name]);
    }
  return (
    <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" name="wifi" id="" onChange={onCbChange} checked={selected.includes('wifi')} />
                    <img src={wifiIcon} alt="wifi" className='w-6 h-6' />
                    <span>wifi</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" name="Free Parking Spot" id="" onChange={onCbChange} checked={selected.includes('Free Parking Spot')}/>
                    <img src={carIcon} alt="car" className='w-6 h-6' />
                    <span>Free Parking Spot</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" name="tv" id="" onChange={onCbChange} checked={selected.includes('tv')}/>
                    <img src={tvIcon} alt="tv" className='w-6 h-6' />
                    <span>TV</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" name="radio" id="" onChange={onCbChange} checked={selected.includes('radio')}/>
                    <img src={radioIcon} alt="radio" className='w-6 h-6' />
                    <span>Radio</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" name="pets" id="" onChange={onCbChange} checked={selected.includes('pets')}/>
                    <img src={petIcon} alt="pet" className='w-6 h-6' />
                    <span>Pets</span>
                </label>
                <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" name="private entrance" id="" onChange={onCbChange} checked={selected.includes('private entrance')}/>
                    <img src={privateIcon} alt="private" className='w-6 h-6' />
                    <span>Primate entrance</span>
                </label>
            </div>

  )
}

export default Perks