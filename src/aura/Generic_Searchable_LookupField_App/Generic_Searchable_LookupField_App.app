<aura:application extends="force:slds" >
    <c:Generic_Searchable_LookupField fieldlabel="Account Name"
                                      fieldObject="Account"
                                      isRequired="true"
                                      lookupfieldAPI="Phone"
                                      backEndFieldAPI="Name"
                                      queryFields="Id,Name,Type"
                                      wherecondition="Phone != ''"/>
</aura:application>