public class Generic_Searchable_LookupField_Ctlr {

    // Method that provides the Activity record created during the process for the use within the component. Query:1,DML:0
    @AuraEnabled
    public static List<RecordsWrap> retrieveRecords (String qfields,
                                                 String qObject,
                                                 String qWhereCond,
                                                 String lookupField) {
        List<RecordsWrap> recordsWrapList = new List<RecordsWrap>();
        try{
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
            //return sobjectRecords;
            for(SObject sobj : sobjectRecords){
                recordsWrapList.add(new RecordsWrap(false,sobj,'Record Retrieved Succesfully'));
            }
        }   
        catch (exception e) {
            //returnMessage = String.valueOf(e.getMessage());
            recordsWrapList = new List<RecordsWrap>();
            recordsWrapList.add(new RecordsWrap(true,null,'Error in Apex: '+e.getMessage()+' at Line:'+e.getLineNumber()));
        }
        return recordsWrapList; 
    }

    public class RecordsWrap{
        @AuraEnabled public Boolean hasError {get;set;}
        @AuraEnabled public SObject mysObj {get;set;}
        @AuraEnabled public String  myExceptionMessage {get;set;}

        public RecordsWrap(Boolean errorFlag,
                           SObject sobj,
                           String msg){
            hasError = errorFlag;
            mysObj = sobj;
            myExceptionMessage = msg;
        }
    }

}