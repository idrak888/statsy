export const highlightList = countries => {
    return countries.filter(doc => {
        return (
            doc.alpha2Code == "DK" ||
            doc.alpha2Code == "LK" ||
            doc.alpha2Code == "AU" ||
            doc.alpha2Code == "SP" ||
            doc.alpha2Code == "IN" ||
            doc.alpha2Code == "FR" ||
            doc.alpha2Code == "DE" ||
            doc.alpha2Code == "BR" ||
            doc.alpha2Code == "CA" ||
            doc.alpha2Code == "MY" ||
            doc.alpha2Code == "CH" ||
            doc.alpha2Code == "JP" ||
            doc.alpha2Code == "EG" ||
            doc.alpha2Code == "BD" ||
            doc.alpha2Code == "CN" ||
            doc.alpha2Code == "KW" ||
            doc.alpha2Code == "MX" ||
            doc.alpha2Code == "SA" ||
            doc.alpha2Code == "KH" ||
            doc.alpha2Code == "PH" ||
            doc.alpha2Code == "TW" ||
            doc.alpha2Code == "LT" ||
            doc.alpha2Code == "SV" ||
            doc.alpha2Code == "AR" ||
            doc.alpha2Code == "CO" ||
            doc.alpha2Code == "JM" ||
            doc.alpha2Code == "HU" ||
            doc.alpha2Code == "BE" ||
            doc.alpha2Code == "ID" ||
            doc.alpha2Code == "FI" ||
            doc.alpha2Code == "NG" ||
            doc.alpha2Code == "AT" ||
            doc.alpha2Code == "TH" 
        )
    }); 
};