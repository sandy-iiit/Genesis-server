const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const healthPolicy = new Scheme(

    {
        Policytype:String,
        Name:String,
        Cover: Number,
        Premium:
            {
                Annual:Number,
                Monthly:Number
            },
        Term:Number,
        Type:String,
        //buy policy
        keyfeatures: {type:String,},
        TC:{type:String,},
        benefits:
            {
                coverages:
                    {
                        nrl:{title:String,description:String},
                        rc:{title:String,description:String},
                        ch:{title:Number,description:String},
                        copay:{title:String,description:String},
                        nrl:{title:String,description:String},
                        mc:{title:String,description:String},
                        pre:{title:Number,description:String},
                        post:{title:Number,description:String},
                        eiwp:{title:Number,description:String},
                    },
                ben:
                    {
                        ncb:{title:Number,description:String},
                        hh:{title:String,description:String},
                        ac:{title:String,description:String},

                    },

                otherben:
                    {
                        benefit1:String,
                        benefit2:String
                    },


            },
    }
)


module.exports = new mongoose.model('healthPolicyDetails',healthPolicy)
