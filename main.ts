import fetch from 'node-fetch';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

/**
 * Represents the scraper
 */
class mscraper {
    /** String with the html to be scraped */
    html: string;
    constructor(html: string) {
        this.html = html;
    }

    /**
     * Parses the html from an url
     * @param url The url to be parsed
     * @returns The Scraper object with the parsed html
     */
    static async getFromUrl(url: string) {
        const response = await fetch(url);
        const body = await response.text();
        return new this(body);
    }

    /**
     * Get the content from a meta element
     * @param tag The meta tag (also known as name/property)
     * @returns The content of the meta element
     */
    get(tag: string) {
        try {
            const dom = new JSDOM(this.html);
            return (
                dom.window.document
                    .querySelector(`meta[name=${tag}]`)
                    ?.getAttribute('content') ||
                dom.window.document
                    .querySelector(`meta[property=${tag}]`)
                    ?.getAttribute('content')
            );
        } catch (err) {
            return undefined;
        }
    }

    /**
     * Get all the matadata on the page
     * @returns All the metadata found on the page
     */
    getAll() {
        const dom = new JSDOM(this.html);
        const elements = dom.window.document.querySelectorAll(`meta`);
        let elementList: object[] = [];
        elements.forEach((e) => {
            elementList.push({
                tag: e.getAttribute('name') || e.getAttribute('property'),
                content: e.getAttribute('content'),
            });
        });
        return elementList;
    }
}

export default mscraper;
