({
    doInit: function(component, event, helper) {
       helper.retrieveRecords(component, event, helper);
       
    },
    showAllResults: function(component, event, helper) {
        var cmpTarget = component.find('recslistdiv');
        $A.util.toggleClass(cmpTarget, 'slds-hide');
    },
    handleSearchKeyUp: function(component, event, helper) {

        helper.startSearchDisplay(component, event, helper);
    },
    selectThisRecord: function(component, event, helper) {
        var clickedActivity = event.target.id;
        component.set("v.fieldSelectedVal", clickedActivity);
        var cmpTarget = component.find('recslistdiv');
        $A.util.addClass(cmpTarget, 'slds-hide');
    },
    checkForNull: function(component, event, helper) {
        var selValue = component.get("v.fieldSelectedVal");
        var errfield = component.find("search-input-error");
        if (selValue === '') {
            errfield.set("v.errors", [{ message: "Selezionare un'attività DMS." }]);
            //Do not confirm on parent component if DMS Activity is null
            return false;
        } 
        else {
            errfield.set("v.errors", '');
            return true;
        }
    }
})