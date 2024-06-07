const multer=require('multer')
const { v4: uuid } = require('uuid');//uuid id used to avoid filename conflict it will generate random id

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads')
    },
    filename(req,file,cb){
        const id=uuid()
        const extName=file.originalname.split(".").pop()  //ex: .png,jpg
        const filename=`${id}.${extName}`
        cb(null,filename)

    
    }
})
const upload=multer({storage}).single('image')

module.exports=upload
