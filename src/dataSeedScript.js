const results = [];

fs.createReadStream(input)
    .pipe(csvParser({
        // we separate our csv data based on comma separation
        separator: ','
    }))
    // convert data format here --> create new variable
    // interate through results array in end stream
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // loop through rows, set document within
        // foreach
        // each document has unique identifier

        results.forEach(applicant => {
            Object.keys(applicant).forEach(key => {
                applicant[key] = applicant[key]
                    .replace(/^,/, "")
                    .trim();
            });
            db.collection('cohorts').doc(applicant["Applicant ID"]).set({
                ...applicant
            })
        });
        // console.log(results)
        // console.log(results.map(applicant => scrub(applicant)));
    });