Vue.use(VeeValidate);
new Vue({
    el: '#app',
    data: {
        showSection: 'Register',
        registrationObject: {
            age: "25",
            state: "",
            email: "",
            country: "",
            address: "",
            address1: "",
            address2: "",
            lastName: "",
            subscribe: "",
            firstName: "",
            interests: "",
            phoneNumber: "",
            profileImage: "",
            selectedInterests: []
        },
        dropDownList: {
            state: ["Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala"
            ],
            country: ["Albania",
                "Antarctica",
                "Antigua and Barbuda",
                "Argentina",
                "Armenia",
                "Aruba",
                "Australia",
                "France",
                "India",
                "Spain",
                "United States"
            ],
            address: ["Company", "Home"]
        },
        customValidation: {
            imageValidation: false
        }
    },
    methods: {
        previewImage: function (event) {
            let input = event.target;
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.registrationObject.profileImage = e.target.result;
                    this.customValidation.imageValidation = false;
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        submitButtonClicked: function () {
            const constomValidation = () => {
                this.customValidation.imageValidation = !this.registrationObject.profileImage.length;
                return !this.customValidation.imageValidation;
            }
            this.$validator.validateAll().then((formValid) => {
                if (constomValidation() && formValid) {
                    this.showSection = 'formPreView';
                }
            });
        },
        interestsInputChange: function () {
            this.registrationObject.selectedInterests = this.registrationObject.interests.split(',').filter((element) => element.length);
        },
        changeAddressTrigger: function () {
            this.registrationObject.address1 = this.registrationObject.address2 = "";
        },
        removeSelectedInterests: function (index) {
            this.registrationObject.selectedInterests.splice(index, 1);
            this.registrationObject.interests = this.registrationObject.selectedInterests.join(',');
        }
    },
});