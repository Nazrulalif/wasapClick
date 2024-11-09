import { useEffect, useState } from "react";

const Home = () => {
  const [countryPrefixes, setCountryPrefixes] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState("MY"); // Default selected prefix
  const [phoneNumber, setPhoneNumber] = useState(""); // State to capture phone number input

  // Fetch country codes on component mount
  useEffect(() => {
    const fetchCountryPrefixes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        // Extract country name, cca2 code, and calling code
        const prefixes = data
          .map((country) => ({
            name: country.name.common,
            cca2: country.cca2, // Country code, e.g., 'MY' for Malaysia
            code:
              country.idd?.root +
              (country.idd?.suffixes ? country.idd?.suffixes[0] : null),
          }))
          // Filter out countries with undefined or empty calling codes
          .filter((item) => item.code);

        // Set the prefixes in state after filtering
        setCountryPrefixes(
          prefixes.sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (error) {
        console.error("Error fetching country prefixes:", error);
      }
    };

    fetchCountryPrefixes();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const phoneNumberFormatted = phoneNumber.replace(/\D/g, ""); // Clean any non-digit characters from the phone number
    const countryCode = countryPrefixes.find(
      (prefix) => prefix.cca2 === selectedPrefix
    )?.code;

    if (countryCode && phoneNumberFormatted) {
      const whatsappUrl = `https://wa.me/${countryCode}${phoneNumberFormatted}`;
      window.open(whatsappUrl, "_blank"); // Open the URL in a new tab
    }
  };

  return (
    <div className="h-full flex-grow flex items-center justify-center">
      <div className="flex flex-col items-center w-auto">
        <div className="font-bold font-mono">
          ⚡️ Enter the Unsaved Number ⚡️
        </div>
        <form className="w-full lg:mx-10" onSubmit={handleSubmit}>
          <div className="mt-3 flex flex-row">
            <select
              className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono text-sm"
              name="prefix"
              value={selectedPrefix}
              onChange={(e) => setSelectedPrefix(e.target.value)}
            >
              {countryPrefixes.map((country, index) => (
                <option key={index} value={country.cca2}>
                  {country.cca2} {country.code}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Phone Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            target="_blank"
            className="border border-solid bg-black text-white py-2 px-5 rounded-md mt-3 w-full font-mono"
          >
            Lessegoo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
