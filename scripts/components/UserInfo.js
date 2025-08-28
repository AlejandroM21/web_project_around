// La clase UserInfo se encarga de gestionar la información del usuario en la página.
// Sus responsabilidades principales son obtener y actualizar el nombre y el trabajo del usuario.

export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // devuelve un objeto con la información actual del usuario, precargar formularios con los datos existentes
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  //toma los datos del nuevo usuario y actualiza la información en los elementos de la página.
  setUserInfo({ name, job, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = `Avatar de ${name}`;
    }
  }
}
