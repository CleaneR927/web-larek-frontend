export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  
};

// Правила валидации для ввода данных пользователя в поля формы

export const ConstraintsUserData = {
  address: {
    presence: { message: 'Поле не может быть пустым', allowEmpty: false },
  },
  email: {
    presence: { message: 'Поле не может быть пустым', allowEmpty: false },
    format: {
      pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$', 
      // pattern: '/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/',
      message: 'Некорректный email'
    }
  },
  phone: {
    presence: { message: 'Поле не может быть пустым', allowEmpty: false },
    format: {
      pattern: '^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$',
      message: 'Некорректный номер'
    }
  }
}
