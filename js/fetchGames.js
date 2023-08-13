function fetchGamesData() {
    return new Promise((resolve, reject) => {
      const sheetUrl = "https://docs.google.com/spreadsheets/d/1UOzHBE-TE29OT5_m1SK221WEf0TCtZrfwab7b-fp1OU/export?format=csv&id=1UOzHBE-TE29OT5_m1SK221WEf0TCtZrfwab7b-fp1OU&gid=0";
      fetch(sheetUrl)
        .then(response => response.text())
        .then(gamesCSV => {
          Papa.parse(gamesCSV, {
            delimiter: ",",
            header: true,
            dynamicTyping: true,
            complete: function (results) {
              resolve(results.data);
            },
            error: function (error) {
              reject(error);
            }
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }