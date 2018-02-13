public class Generic_Searchable_LookupField_Ctlr {

    // Method that provides the Activity record created during the process for the use within the component. Query:1,DML:0
    @AuraEnabled
    public static List<sObject> retrieveRecords (String qfields,
                                                 String qObject,
                                                 String qWhereCond,
                                                 String lookupField) {
        List<sObject> sobjectRecords = new List<sObject>();
        String soqlQuery = 'SELECT ';
        if (String.isNotBlank(qfields))  {
            if (qfields.containsIgnoreCase(lookupField)) {
                soqlQuery = soqlQuery + qfields;
            } 
            else {
                soqlQuery = soqlQuery + qfields + ',' + lookupField;
            }
        } 
        else {
            soqlQuery = soqlQuery+lookupField;
        }
        soqlQuery = soqlQuery+' FROM '+qObject;
        if (String.isNotBlank(qWhereCond))  {
            if('WHERE'.containsIgnoreCase(qWhereCond)){
                soqlQuery = soqlQuery+' '+qWhereCond;
            }
            else {
                soqlQuery = soqlQuery+' WHERE '+qWhereCond;
            }
        }
        System.debug('Final SOQL>: '+soqlQuery);
        sobjectRecords = Database.query(soqlQuery);
        return sobjectRecords;
    }

}