document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song`);
        const data = await response.json();

        if (data.results.length > 0) {
            let count = 0;
            let row;

            while (count < data.results.length) {
            
                const column1 = document.createElement('div');
                column1.className = 'col-md-2';
                const column4 = document.createElement('div');
                column4.className = 'col-md-2';

                if (count % 2 === 0) {

                    row = document.createElement('div');
                    row.className = 'row';
                    resultsDiv.appendChild(row);

                    
                }
                
                const column = document.createElement('div');
                column.className = 'col-md-4';

                

                const song = data.results[count];
                const card = document.createElement('div');
                card.className = 'card mb-6';

                const cardImageDiv = document.createElement('div');
                cardImageDiv.className = 'card-body';


                const img = document.createElement('img');
                img.className = 'card-img-top';
                img.src = song.artworkUrl100;
                img.alt = song.trackName;

                cardImageDiv.appendChild(img);


                const cardBody = document.createElement('div');
                cardBody.className = 'card-body text-center';

                const title = document.createElement('h4');
                title.className = 'h4 font-weight-bold';
                const songName = document.createElement('h5');
                songName.textContent = song.trackName;
                title.appendChild(songName);

                const artist = document.createElement('p');
                artist.className = 'mb-0';
                artist.textContent = song.artistName;

                const audio = document.createElement('audio');
                audio.id = 'sound';
                audio.controls = true;
                const source = document.createElement('source');
                source.src = song.previewUrl;
                console.log(song.previewUrl);
                source.type = 'audio/mp4';
                audio.appendChild(source);


                cardBody.appendChild(title);
                cardBody.appendChild(artist);
                cardBody.appendChild(audio);

                card.appendChild(cardImageDiv);
                card.appendChild(cardBody);

                column.appendChild(card);
                row.appendChild(column);

                if (count % 2 === 0) {

                column.before(column1);
                    
                }
                
                count++;
            }
        } else {
            resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Error al buscar la canción.</p>';
    }
}); 
