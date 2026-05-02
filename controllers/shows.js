import axios from "axios";
import config from "../config.js";

// Mengambil base URL dari config (itv.iq.com)
const BASE_URL = config.DRAMA.API_BASE || "https://itv.iq.com/intl-common";
const DOMAIN = config.DRAMA.DOMAIN || "https://www.iq.com";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": DOMAIN,
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
};

/**
 * Mengambil daftar drama terbaru dari iQIYI
 */
export const getAllShows = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/category/list`, {
            params: {
                categoryId: 2, 
                pageNum: page,
                pageSize: 20,
                language: "id_id"
            },
            headers
        });
        
        return response.data.data.map(item => ({
            id: item.albumId,
            title: item.name,
            poster: item.imageUrl,
            description: item.description,
            score: item.score
        }));
    } catch (error) {
        throw new Error("Gagal fetch getAllShows: " + error.message);
    }
};

/**
 * Mengambil detail drama berdasarkan ID
 */
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
        throw new Error("Gagal fetch getShowById: " + error.message);
    }
};

/**
 * Mengambil informasi streaming episode
 */
export const getEpisodeById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/video/playinfo`, {
            params: {
                tvId: id,
                language: "id_id"
            },
            headers
        });

        const data = response.data.data;
        return {
            id: id,
            video_url: data.playUrl || null,
            subtitles: data.subtitles || [],
            title: data.name
        };
    } catch (error) {
        throw new Error("Gagal fetch getEpisodeById: " + error.message);
    }
};

/**
 * Mencari drama di iQIYI
 */
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

        const results = response.data.data.docInfos || [];
        return results.map(item => ({
            id: item.albumId,
            title: item.albumName,
            poster: item.albumImageUrl,
            score: item.score
        }));
    } catch (error) {
        throw new Error("Gagal fetch search: " + error.message);
    }
};
