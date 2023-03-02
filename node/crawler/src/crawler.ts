/*
 * @Description : 爬虫类
 * @Date        : 2021-10-24 17:11:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-24 21:56:51 +0800
 * @LastEditors : JackChou
 */
import * as superagent from 'superagent'
import path from 'path'
import fs from 'fs'
import MovieAnalyzer, { IAnalyzer } from './MovieAnalyzer'
class Crawler {
  constructor(private url: string, private analyzer: IAnalyzer, private filepath: string) {
    this.initSpider()
  }

  private async initSpider() {
    const html = await this.getRawHtml()
    const movieList = this.analyzer.analyze(html, this.filepath)
    this.saveToJSON(JSON.stringify(movieList))
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  private saveToJSON(moviesString: string) {
    fs.writeFileSync(this.filepath, moviesString) // 写入文件
    return true
  }
}
const movieAnalyzer = MovieAnalyzer.getInstance()

const url = 'https://movie.douban.com/cinema/nowplaying/chengdu/'
const filepath = path.join(__dirname, '../data/playing.json')

new Crawler(url, movieAnalyzer, filepath)
