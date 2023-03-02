/*
 * @Description : 提取电影信息
 * @Date        : 2021-10-24 19:17:34 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 20:20:51 +0800
 * @LastEditors : JackChou
 */
import * as cheerio from 'cheerio'
import fs from 'fs'
import { Movie } from './types'
export interface IAnalyzer {
  analyze: (html: string, filePath: string) => Movie[]
}
export default class MovieAnalyzer implements IAnalyzer {
  private constructor() {}
  private static instance: MovieAnalyzer
  static getInstance() {
    if (!MovieAnalyzer.instance) {
      MovieAnalyzer.instance = new MovieAnalyzer()
    }
    return MovieAnalyzer.instance
  }

  analyze(htmlCode: string, dataFilepath: string) {
    const movies = this.getMovieInfo(htmlCode)
    return this.generateMovieList(movies, dataFilepath)
  }
  private getMovieInfo(htmlCode: string): Movie[] {
    const $ = cheerio.load(htmlCode)
    const playing = $('#nowplaying')
    const list = playing.find('.lists')
    const movieList: Movie[] = []
    list.children().each((index, element) => {
      const cheerioObj = $(element)
      const poster = cheerioObj.find('.poster').find('img').attr('src')
      const movie = cheerioObj.data()
      movieList.push({ poster: poster, ...movie })
    })
    return movieList
  }

  private generateMovieList(movies: Movie[], oldFilepath: string) {
    if (!fs.existsSync(oldFilepath)) {
      return movies
    }
    let playingMovies: Movie[] = JSON.parse(fs.readFileSync(oldFilepath, 'utf-8')) // 读取文件
    const newMovies = movies.filter(movie => {
      const exist = playingMovies.find(item => item.poster === movie.poster && item.title === movie.title) // 判断是否存在
      return !exist
    })
    playingMovies.push(...newMovies)
    return playingMovies
  }
}
