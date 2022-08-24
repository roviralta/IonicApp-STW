/**
 * Image object containing a path, the source, a description and a date
 */
export default class Image {
    path: string;
    webviewPath: string;
    description: string;
    date: string;

    constructor(
        path: string,
        webviewPath: string,
        description: string,
        date: string
    ) {
        this.path = path;
        this.webviewPath = webviewPath;
        this.description = description;
        this.date = date;
    }
}
