'use client'
import Image from 'next/image'
import SliderExample from './slider';
import Button from '@mui/material/Button';

/// <reference types="web-bluetooth" />



export default function Home() {
  console.log("test");
  function handleClick() {
    navigator.bluetooth.getAvailability().then((available) => {
      if (available) {
        console.log("This device supports Bluetooth!");
        navigator.bluetooth.requestDevice({
          filters: [{ services: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"] }]
        }).then(async (device: BluetoothDevice) => {
          if (!device.gatt) throw Error('Expected GATT on device but got none.')
          const gatt = await device.gatt.connect()
          const service = await gatt.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
          const characteristic = await service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8")
          //const response = await characteristic.readValue()
          const dec = new TextDecoder()
          //const name = dec.decode(response);
          //console.log(name);
          const enc = new TextEncoder();
          var value = new Uint8Array([132]);
          await characteristic.writeValue(value);
          
        }).catch((reason) => {
          console.log(`ProtoGATT Connect Failed: ${reason}`)
        })
      } else {
        console.log("Doh! Bluetooth is not supported");
      }
    });
  }

  async function bluetooth() {
    await navigator.bluetooth.requestDevice({
      filters: [{ services: ['c6bcb95f-a2d6-46c7-bc16-e7fa574f8066'] }]
    });
  }


  return (
    <main>

        <div style={{width:300}}>
        <SliderExample/>

        </div>
        <Button variant="contained" onClick={handleClick}>Connect</Button>


      <div style={{color:"red"}}>Hallo</div>
    </main>
  )
}
