$(document).ready(function () {
    let currentPage = 1;
    const limit = 20;
    const tableBody = $("#pokemon-table-body");
    const loadMoreBtn = $("#load-more-btn");
    let isLoading = false;

    function loadPokemon(page) {
        const offset = (page - 1) * limit;
        isLoading = true;
        loadMoreBtn.removeClass("d-none");
        
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                $.each(data.results, function (index, pokemon) {
                    const rowHTML = `
                        <tr>
                            <td class="text-capitalize">${pokemon.name}</td>
                            <td>
                                <a href="details.html?url=${pokemon.url}" class="btn btn-success">View Details</a>
                            </td>
                        </tr>
                    `;
                    tableBody.append(rowHTML);
                });

                isLoading = false;
                loadMoreBtn.addClass("d-none");
            },
            error: function () {
                alert("Failed to load Pokémon data.");
                isLoading = false;
                loadMoreBtn.addClass("d-none");
            }
        });
    }

    // Infinite scroll 
    $(window).on("scroll", function () {
        if (isLoading) return;

        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();

        if (scrollTop + windowHeight + 20 >= documentHeight) {
            isLoading = true;
            loadMoreBtn.removeClass("d-none");

            setTimeout(function () {
                currentPage++;
                loadPokemon(currentPage);
            }, 1000);
        }
    });

    // Initial load
    loadPokemon(currentPage);
});
