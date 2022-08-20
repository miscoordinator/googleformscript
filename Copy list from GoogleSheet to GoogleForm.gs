const ssid = "1MWQSU25APasbrbRw9mAPcp7yTPStjiEonGEBvlPdsEI" //Google Sheet Id
const sheet = SpreadsheetApp.openById(ssid).getSheetByName("data")
const formid = "129RxU569XUSUa-S8F11jmSRAah3gZMiJPxGZjxHVd5c"//Google Form Id
const form = FormApp.openById(formid)
/**
 * @param {String} title
 * @returns {FormApp.Item}
 */
const getFormFieldBy = (title) => {
  return form.getItems().filter(item => item.getTitle() === title)[0]
}

/**
 * @param {String} columnTitle
 * @returns {Array<String>}
 */
const getSheetValuesBy = (columnTitle) => {
  const columnTitles = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn())[0]
  for (let i = 0; i < columnTitles.length; i++) {
    if(columnTitles[i]===columnTitle){
      return sheet.getSheetValues(2, i+1, sheet.getLastRow()-1,1).map((cell,index)=>cell[0])
    }
  }
}

/**
 * This function only works if and only if [fieldName of Sheet must exactly matched with fieldName of Form]
 * @param {String} fieldName
 */
const setListItemsFromSheetToForm = (fieldName) =>{
  getFormFieldBy(fieldName).asListItem().setChoiceValues(getSheetValuesBy(fieldName))
}

const main = () => {
  setListItemsFromSheetToForm('School Name')
}
