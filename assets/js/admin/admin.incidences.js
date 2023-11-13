(() => {
  'use strict';
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.clear();
    changeView('');
  }
})();

const getIncidences = async () => {
  let content = ``;
  try {
    const response = await axiosClient.get(`/incidences/`); // Cambiar la ruta según la API real
    for (const [index, incidence] of response?.incidences.entries()) {
      content += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${incidence.title}</td>
            <td>${incidence.description}</td>
            <td>${incidence.incidenceDate}</td>
            <td>
              <span class="badge rounded-pill bg-${
                Number(incidence.status.id) === 3 ? 'warning' : 'primary'
              }">${incidence.status.description}</span>
            </td>
            <td>${incidence.type}</td>
        </tr>
        `;
    }
    document.getElementById('incidencesBody').innerHTML = content;
    const table = document.getElementById('incidencesTable');
    new DataTable(table, {
      columnDefs: [{ orderable: false, targets: 5 }],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      },
    });
  } catch (error) {
    toastMessage('Error').showToast();
  }
};

$(document).ready(function () {
  if (!fullname) fullname = localStorage.getItem('fullname');
  if (!role) role = localStorage.getItem('activeRole');
  $('#fullname').text(fullname);
  $('#fullname2').text(fullname);
  $('#role').text(role);
  getIncidences();
});
