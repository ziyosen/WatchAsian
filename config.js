const SERVER = {
    HOST: process.env.HOST || "0.0.0.0",
    PORT: process.env.PORT || 3000
}

const DRAMA = {
    // Ganti domain ke iQIYI
    DOMAIN: process.env.DOMAIN || "https://www.iq.com",
    // Tambahkan base API jika diperlukan agar service lebih rapi
    API_BASE: "https://itv.iq.com/intl-common"
}

const ENCRYPTION = {
    KEY: "93422192433952489752342908585752",
    IV: "9262859232435825"
}

export default { SERVER, DRAMA, ENCRYPTION };
