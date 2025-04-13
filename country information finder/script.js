document.getElementById('searchBtn').addEventListener('click', function () {
    const countryName = document.getElementById('countryInput').value.trim();

    if (!countryName) {
        document.getElementById('countryInfo').textContent = "Please enter a country name.";
        return;
    }

    // Fetch country information from the REST Countries API
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found!");
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            const info = `
                <p><strong>Country:</strong> ${country.name.common}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
                <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})</p>
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 100px; margin-top: 10px;">
            `;
            document.getElementById('countryInfo').innerHTML = info;
        })
        .catch(error => {
            document.getElementById('countryInfo').textContent = error.message;
        });
});