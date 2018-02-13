<aura:application extends="force:slds" >
    <c:Generic_Searchable_LookupField fieldlabel="Case Number"
                                      fieldObject="Case"
                                      isRequired="true"
                                      lookupfieldAPI="CaseNumber"
                                      backEndFieldAPI="Id"
                                      queryFields="Id"
                                      />
</aura:application>