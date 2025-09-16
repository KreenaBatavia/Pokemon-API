$(document).ready(function () {
    const apiUrl = new URLSearchParams(window.location.search).get("url");
    const LoadMorebutton = $("#load-more-btn");
    const Detailscontent = $(".details-content");

    if (apiUrl) {
        let currentId = parseInt(apiUrl.split("/")[6], 10);
        console.log(currentId);

        LoadMorebutton.removeClass("d-none");
        $(".hide").addClass("d-none");

        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (pokemon) {

                $("#pokemon-name").text(pokemon.name);
                $("#pokemon-image").attr("src", pokemon.sprites.other["official-artwork"].front_default);

                const infoList = $("#pokemon-info");
                infoList.empty();

                const types = pokemon.types.map(t => t.type.name).join(", ");
                infoList.append(`<li class="list-group-item"><strong>Type:</strong> ${types}</li>`);
                infoList.append(`<li class="list-group-item"><strong>Height:</strong> ${pokemon.height}</li>`);
                infoList.append(`<li class="list-group-item"><strong>Weight:</strong> ${pokemon.weight}</li>`);
                const abilities = pokemon.abilities.map(a => a.ability.name).join(", ");
                infoList.append(`<li class="list-group-item"><strong>Abilities:</strong> ${abilities}</li>`);

                LoadMorebutton.addClass("d-none");
                $(".hide").removeClass("d-none");

            },
            error: function () {
                $("#pokemon-name").text("Failed to load Pokémon data.");
            }
        });

        $("#prev-button").click(function () {
            if (currentId > 1) {
                const prevUrl = `https://pokeapi.co/api/v2/pokemon/${currentId - 1}`;
                window.location.href = `details.html?url=` + prevUrl;
            }
        });

        $("#next-button").click(function () {
            const nextUrl = `https://pokeapi.co/api/v2/pokemon/${currentId + 1}`;
            window.location.href = `details.html?url=` + nextUrl;
        });

    } else {
        $("#pokemon-name").text("No Pokémon URL provided.");
    }
});
