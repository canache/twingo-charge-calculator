'use client'
import React, {useState} from 'react';
import Image from "next/image"; // Remplacez cela par le bon chemin vers votre image


export default function Home() {

  const chargeMax = 80
  const chargePerMinute = 0.1429
  const defaultInitCharge = 20
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getDefaultEndDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getEndDate = (initDate: Date, chargeInitial: number, percentToCharge: number | null) => {
    let pourcentageRestantAcharger = percentToCharge ? percentToCharge : chargeMax - chargeInitial;
    let minutesPourCharger = pourcentageRestantAcharger / chargePerMinute;

    // Conversion de la date initiale en epoch seconds
    const initDateEpochSeconds = Math.floor(initDate.getTime() / 1000);

    // Ajout des minutes converties en secondes
    const newDateEpochSeconds = initDateEpochSeconds + Math.floor(minutesPourCharger * 60);

    // Création d'une nouvelle date à partir des epoch seconds obtenus
    const newDate = new Date(newDateEpochSeconds * 1000); // Multipliez par 1000 pour convertir les secondes en millisecondes

    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getStartDate = (endDate: Date, chargeInitial: number, percentToCharge: number | null) => {
    let pourcentageRestantAcharger = percentToCharge ? percentToCharge : chargeMax - chargeInitial;
    let minutesPourCharger = pourcentageRestantAcharger / chargePerMinute;

    // Conversion de la date initiale en epoch seconds
    const endDateEpochSeconds = Math.floor(endDate.getTime() / 1000);

    // Ajout des minutes converties en secondes
    const newStartDateEpochSeconds = endDateEpochSeconds - Math.floor(minutesPourCharger * 60);

    // Création d'une nouvelle date à partir des epoch seconds obtenus
    const newDate = new Date(newStartDateEpochSeconds * 1000); // Multipliez par 1000 pour convertir les secondes en millisecondes

    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [startDate, setStartDate] = useState(getCurrentDateTime());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [chargePercentage, setChargePercentage] = useState(chargeMax - defaultInitCharge);
  const [startPercentage, setStartPercentage] = useState(defaultInitCharge);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'startDate':
        setStartDate(value);
        let newInitDate = new Date(value)
          setEndDate(getEndDate(newInitDate, startPercentage, chargePercentage))
        break;
      case 'endDate':
        setEndDate(value);
        let newEndDate = new Date(value)
          setStartDate(getStartDate(newEndDate, startPercentage, null))
        break;
      case 'chargePercentage':
        setChargePercentage(parseFloat(value));
        setEndDate(getEndDate(new Date(startDate), startPercentage, parseFloat(value)))
        break;
      case 'startPercentage':
        setStartPercentage(parseFloat(value));
        setEndDate(getEndDate(new Date(startDate), parseFloat(value), null))
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setStartDate(getCurrentDateTime);
    setEndDate(getEndDate(new Date(), defaultInitCharge, chargeMax));
    setChargePercentage(chargeMax - defaultInitCharge);
    setStartPercentage(defaultInitCharge);
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
        <div className="flex items-center">
          <Image
              className="relative"
              src="/twingo.jpg"
              alt="Twingo"
              width={180}
              height={37}
              priority
          />
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text pb-4">
          Welcome to Twingo Charging Simulator</h1>
        <Image
            className="relative"
            src="/twingo.jpg"
            alt="Twingo"
            width={180}
            height={37}
            priority
        />
        </div>
        <div className="bg-orange-100 border border-orange-500 text-orange-700 px-4 py-3 mb-4" role="info">
          <ul>
            <li className="mb-2">- % par minute: <span className="font-bold text-xl">{chargePerMinute}%</span></li>
            <li> - % Maximum du charge:<span className="font-bold text-xl"> 80%</span></li>
          </ul>
        </div>

        <div className="w-1/2 mr-8">
          <form className="flex flex-col items-center space-y-4">
            <div className="border-orange-500 border-2 p-4 rounded-md shadow-md w-full mb-4">
              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Date de début:</label>
                <input
                    type="datetime-local" // Utilisez le type datetime-local ici
                    name="startDate"
                    value={startDate}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Date de fin:</label>
                <input
                    type="datetime-local" // Utilisez le type datetime-local ici
                    name="endDate"
                    value={endDate}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">% à Charger:</label>
                <input
                    type="number"
                    name="chargePercentage"
                    value={chargePercentage}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                />
              </div>

              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">% de début:</label>
                <input
                    type="number"
                    name="startPercentage"
                    value={startPercentage}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                />
              </div>
            </div>

            <button
                type="button"
                onClick={handleReset}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Reset
            </button>
          </form>

        </div>
      </main>
  );
}
