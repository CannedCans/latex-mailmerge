
export type KeywordDict = {[id: string]: string};

/**
 * Clone inString n times and return the resulting array
 * 
 * @param inString 
 * @param n 
 */
function cloneStringN(inString: string, n: number): string[] {
    let retVal: string[] = []

    for (let i = 0; i < n; i++) {
        retVal.push(`${inString}`);
    }



    return retVal;

}

export class MailMerge {

    /** The base LaTeX text to work off of */
    private _template: string | null

    /**
     * Set the base template that will be used
     */
    set template(newTemplate: string) {
        this._template = newTemplate;
    }

    /** The keywords to be used */
    private _keywords: string[] = [];

    /** One for each output */
    private _instances: KeywordDict[] = [];

    /**
     * Add an expected replacement combination
     * 
     * @param inst 
     * @example add({"%%hello": "replaced text"})
     */
    public add(inst: KeywordDict) {
        this._instances.push({...inst});

        for (let i in inst) {
            if (!(i in this._keywords)) {
                this._keywords.push(i);
            }
        }

    }

    /**
     * Process all the instances, returning one string for each instance.
     * 
     * Keywords are processed in order of appearance in an internal list.
     * 
     * If a keyword does not appear in an instance, nothing will happen for that keyword.
     * 
     * @throws an error if the template is not set
     */
    public processAll(): string[] {
        if (this._template === null) {
            throw new Error('Template not set! Use template(string) to set it first!')
        }

        let templateClones = cloneStringN(this._template, this._instances.length);

        for (let keyWord of this._keywords) {
            for (let index = 0; index < templateClones.length; index++) {
                if (keyWord in this._instances[index]) {

                    templateClones[index].replace(keyWord, this._instances[index][keyWord]);
                }
            }
        }


        return templateClones;

    }

    /**
     * Create a new MailMerger
     * 
     * @param template the template to use, string or null, must be set before use
     */
    constructor(template: string | null = null) {
        this._template = template;
    }

}

export default MailMerge;
