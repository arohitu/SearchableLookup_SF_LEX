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
        var selectedValueBackEndId = event.target.id;
        var selectedValueDisplayText = event.target.name;
        component.set("v.fieldSelectedVal", selectedValueDisplayText);
        var cmpTarget = component.find('recslistdiv');
        $A.util.addClass(cmpTarget, 'slds-hide');
        console.log("Display text: " + selectedValueDisplayText);
        console.log('Backend Value>: '+selectedValueBackEndId);
    },
    checkForNull: function(component, event, helper) {
        var selValue = component.get("v.fieldSelectedVal");
        var errfield = component.find("search-input-error");
        if (selValue === '') {
            errfield.set("v.errors", [{ message: "Please select a value" }]);
            return false;
        } 
        else {
            errfield.set("v.errors", '');
            return true;
        }
    }
})