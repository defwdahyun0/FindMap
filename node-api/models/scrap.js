const pool = require('../modules/pool');
const db = require('../config/database');
const { param } = require('../routes');

const scrap = {
    postScrap: async(userIdx, title, contentUrl, thumbnailUrl, summary, comment, categoryIdx, folderIdx, feedIdx) => {
        const fields = 'userIdx, title, contentUrl, thumbnailUrl, summary, comment, categoryIdx, folderIdx, feedIdx';
        const values = [userIdx, title, contentUrl, thumbnailUrl, summary, comment, categoryIdx, folderIdx, feedIdx];
        const query = `INSERT INTO ScrapTB(${fields}) VALUES(?,?,?,?,?,?,?,?,?)`;
        try {
            const result = await pool.queryParamArr(query, values);
            return result;
            console.log(result);
        } catch (err) {
            console.log('스크랩 생성 ERROR: ', err);
            throw err;
        }
    },
    selectScrap: async(userIdx) => {
        const query = `SELECT idx, title, contentUrl, thumbnailUrl, summary, comment, categoryIdx, folderIdx, feedIdx 
        FROM ScrapTB WHERE userIdx = ? and status = 'Y'`;
        const params = [userIdx];
        try {
            const result = await pool.queryParam(query,params);
            return result;
        } catch (err) {
            console.log('아카이브 조회 ERROR: ', err);
            throw err;
        }
    },
    selectScrapDetail: async(userIdx, scrapIdx) => {
        const query = `SELECT idx, title, contentUrl, thumbnailUrl, summary, comment, categoryIdx, folderIdx, feedIdx, createdAt, updatedAt, status 
        FROM ScrapTB WHERE userIdx = ? and idx = ? and status = 'Y'`;
        const params = [userIdx, scrapIdx];
        try {
            const result = await pool.queryParam(query,params);
            return result;
        } catch (err) {
            console.log('스크랩 상세 조회 ERROR: ', err);
            throw err;
        }
    },
    updateScrapComment: async(userIdx, scrapIdx, comment) => {
        const query = `UPDATE ScrapTB SET comment = ? WHERE userIdx = ? and idx = ?;`
        const params = [comment, userIdx, scrapIdx];
        try {
            const result = await pool.queryParam(query,params);
            return [result];
        } catch (err) {
            console.log('스크랩 comment 수정 ERROR : ', err);
            throw err;
        }
    },
    updateScrapCategory: async(userIdx, scrapIdx, categoryIdx) => {
        const query = `UPDATE ScrapTB SET categoryIdx = ? WHERE userIdx = ? and idx = ?;`
        const params = [categoryIdx, userIdx, scrapIdx];
        try {
            const result = await pool.queryParam(query,params);
            return [result];
        } catch (err) {
            console.log('스크랩 categoryIdx 수정 ERROR : ', err);
            throw err;
        }
    },
    updateScrapFolder: async(userIdx, scrapIdx, folderIdx) => {
        const query = `UPDATE ScrapTB SET folderIdx = ? WHERE userIdx = ? and idx = ?;`
        const params = [folderIdx, userIdx, scrapIdx];
        try {
            const result = await pool.queryParam(query,params);
            return [result];
        } catch (err) {
            console.log('스크랩 folderIdx 수정 ERROR : ', err);
            throw err;
        }
    },
    updateScrapFeed: async(userIdx, scrapIdx, feedIdx) => {
        const query = `UPDATE ScrapTB SET feedIdx = ? WHERE userIdx = ? and idx = ?;`
        const params = [feedIdx, userIdx, scrapIdx];
        try {
            const result = await pool.queryParam(query,params);
            return [result];
        } catch (err) {
            console.log('스크랩 feedIdx 수정 ERROR : ', err);
            throw err;
        }
    },
    deleteScrap: async(userIdx, scrapIdx) => {
        const query = `UPDATE ScrapTB SET status = 'D' WHERE userIdx = ? and idx = ?;`
        const params = [userIdx, scrapIdx];
        try {
            const result = await pool.queryParam(query,params);
            return [result];
        } catch (err) {
            console.log('스크랩 삭제 ERROR : ', err);
            throw err;
        }
    }
}

module.exports = scrap;

/*
    checkScrap: async(userIdx) => {
        const query = `SELECT idx FROM ScrapTB 
        WHERE userIdx = ? and title = ? and contentUrl = ? and thumbnailUrl = ? and summary = ? and comment = ? 
        and categoryIdx = ? and folderIdx = ? and feedIdx = ?`;
        const params = [userIdx, title, contentUrl, thumbnailUrl, summary, comment, categoryIdx, folderIdx, feedIdx];
        try {
            const result = await pool.queryParam(query,params);
            return result;
        } catch (err) {
            console.log('scrap 확인 ERROR: ', err);
            throw err;
        }
    }
*/
