const totalSupply = 1000000; // BUSE total supply

function formatNumber(num) {
  return num.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

async function fetchOraclePrice() {
  try {
    const res = await fetch("./mock-price-feed.json");
    const data = await res.json();

    // Oracle fiyatı
    const price = data.price_usd;

    // Market cap hesapla
    const marketCap = price * totalSupply;

    // UI güncelle
    document.getElementById("price").innerText = `$${formatNumber(price)}`;
    document.getElementById("marketcap").innerText = `$${formatNumber(marketCap)}`;
    document.getElementById("updated").innerText = new Date().toLocaleTimeString();

  } catch (err) {
    document.getElementById("price").innerText = "Hata!";
    console.error("Oracle fetch error:", err);
  }
}

// İlk yüklemede çalıştır
fetchOraclePrice();

// Her 10 saniyede bir oracle güncelle
setInterval(fetchOraclePrice, 10000);

