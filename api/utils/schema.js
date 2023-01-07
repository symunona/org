/**
 * Generates a .schema.md file based on the data
 */

const fs = require('fs'),
        path = require('path'),
        _ = require('underscore');
const { values } = require('underscore');

// TODO: DUMMY
const md = {parse: ()=>{}, encode: ()=>{} };

// Match the following files for metadata extraction.
const EXTENSION_MATCHER = /(.*)\.md/

// Export the following filename
const SCHEMA_FILENAME = '.schema.md'

// If there is a value over this length, it's not an enum.
const ENUM_THRESHOLD = 100

// Types we deal with
const NUMBER_TYPE = 'Number'
const DATE_TYPE = 'Date'
const URL_TYPE = 'Url'
const TEXT_TYPE = 'Text'

// Order of separators
const SEPARATORS = ';,/'

/**
 * Find the separator that the file uses in priority
 * @param {} values
 */
const getSeparator = (values) => {
    return SEPARATORS.split('').find((separator)=>{
        return values.indexOf(separator) > -1
    })
}

/**
 * Returns a string representation of the field.
 * Possible values:
 * - Number
 * - Date
 * - URL
 * - Tag (Array of values )
 * @param {Array} field
 * @returns {String}
 */
const guessType = (fieldValue) => {
    // Number if we do not find any NaNs.
    if (!fieldValue.find((val)=>isNaN(Number(val)))){
        return NUMBER_TYPE;
    }
    // Date if we do not find any invalid ones.
    if (!fieldValue.find((val)=>new Date(val)).isInvalid()){
        return DATE_TYPE;
    }
    // Does it look like an URL?
    if (!fieldValue.find((val)=>!String(val).startsWith('http'))) {
        return URL_TYPE;
    }

    // Is it a list separated by commas?
    if (!fieldValue.find((val)=>String(val).length > ENUM_THRESHOLD)){
        const tags = {}
        const separator = getSeparator(val)
        // ENUM
        if (!separator){
            values.map((val)=>tags[val] = true)
        } else {
            // Tags
            values.map((line) => line.split(separator).map((tag)=>tags[tag.trim()] = true))
        }

        return Object.keys(tags).join(',')
    }

    return TEXT_TYPE
}



module.export = (folder) => {
    const files = fs.readdirSync(folder)
    let metaDataFields = {}
    files.map((file)=>{
        // If we match the file, get the metadata.
        if (EXTENSION_MATCHER.match(file)){
            const metaData = mdParser(fs.readFileSync(file))

            Object.keys(metaData).map((field) => {
                metaDataFields[field] = metaDataFields[field] || []
                // Do not push null values
                if (metaData[field] !== undefined) { metaDataFields[field].push() }
            })
        }
    })
    if (!Object.keys(metaDataFields).length) { return };

    // Now we have the metadata of each file, let's make some guesses about what the data may be?
    Object.keys(metaDataFields).map((key)=>{
        metaDataFields[key] = guessType(metaDataFields[key])
    })

    // Export the schema file into the folder.
    fs.writeFileSync(path.join(folder, SCHEMA_FILENAME), md.encode(metaDataFields))
}


