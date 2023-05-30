public with sharing class ContactHovering {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getConList(String conSearch){
            System.debug('conSearch---->'+conSearch);
            String key = '%' + conSearch + '%';
            System.debug('key>>>>>'+key);
            list<Contact> conList = new list<Contact>();
            for(Contact con : [SELECT Id,Name,Phone,Email FROM Contact  WHERE Name LIKE:key]){
                System.debug('Check>>>>>>>');
                conList.add(con);
                System.debug('con>>>'+con);
            }
            if(conList.size() == 0){
                throw new AuraHandledException('No Record Found');
            }
            System.debug('conList>>>'+conList);
            return conList;
        }
    }