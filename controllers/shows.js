import axios from "axios";

// Base URL API iQIYI (biasanya menggunakan API internasional)
const BASE_URL = "https://itv.iq.com/intl-common";
const DOMAIN = "https://www.iq.com";

// Helper untuk headers agar tidak diblokir
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": DOMAIN,
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
};

export const getAllShows = async (page = 1) => {
    try {
        // iQIYI menggunakan genreId atau categoryId. 2 adalah ID untuk Drama.
        // Paging di iQIYI biasanya menggunakan 'pageNum'
        const response = await axios.get(`${BASE_URL}/category/list`, {
            params: {
                categoryId: 2, 
                pageNum: page,
                pageSize: 20,
                language: "id_id"
            },
            headers
        });
        
        // Memetakan hasil agar sesuai dengan struktur controller kamu
        return response.data.data.map(item => ({
            id: item.albumId,
            title: item.name,
            poster: item.imageUrl,
            description: item.description,
            score: item.score
        }));
    } catch (error) {
        throw Error("Gagal mengambil daftar drama dari iQIYI");
    }
};

export const getShowById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/album/detail`, {
            params: {
                albumId: id,
                language: "id_id"
            },
            headers
        });

        const data = response.data.data;
        return {
            id: data.albumId,
            title: data.name,
            poster: data.imageUrl,
            episodes_count: data.latestOrder,
            genre: data.genres,
            synopsis: data.description
        };
    } catch (error) {
        throw Error("Detail drama tidak ditemukan");
    }
};

export const getEpisodeById = async (id) => {
    try {
        // Di iQIYI, kita butuh tvId untuk mengambil link video/streaming
        const response = await axios.get(`${BASE_URL}/video/playinfo`, {
            params: {
                tvId: id,
                language: "id_id"
            },
            headers
        });

        return {
            id: id,
            video_url: response.data.data.playUrl, // Tergantung ketersediaan API
            subtitle: response.data.data.subtitles || []
        };
    } catch (error) {
        throw Error("Gagal mengambil data episode");
    }
};

export const search = async (keyword) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/search`, {
            params: {
                keyword: keyword,
                pageNum: 1,
                pageSize: 15,
                language: "id_id"
            },
            headers
        });

        return response.data.data.docInfos.map(item => ({
            id: item.albumId,
            title: item.albumName,
            poster: item.albumImageUrl
        }));
    } catch (error) {
        throw Error("Pencarian gagal");
    }
};
