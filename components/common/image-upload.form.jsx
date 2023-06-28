import { useState } from "react";
import { Form, Image } from "semantic-ui-react"
import { ImageUpload } from "../../utils/image-upload";

const ImageUploadForm = ({ type, uploadApiUri, originalImageUrl }) => {
  const [image_url, setImageUrl] = useState(originalImageUrl)
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form>
      <Form.Input
        label={`${type} 사진`} // 장소 사진, 장비 사진
        type={'file'}
        accept={'image/*'}
        onChange={async (evt) => {
          const file = evt.target.files[0]
          ImageUpload(uploadApiUri, file);
          setIsChanged(true);

          const fileReader = new FileReader()
          fileReader.onloadend = () => {
            setImageUrl(fileReader.result)
          }
          fileReader.readAsDataURL(file)
        }}
      />
      <div style={{ margin: '10px 0' }}>
        <Image
          src={image_url}
          alt={"place_image"}
          height={200}
          onError={({ currentTarget }) => {
            // currentTarget.onerror = null; // prevents looping
            currentTarget.src='https://react.semantic-ui.com/images/wireframe/image.png';
          }}
        />
      </div>
      <p>이미지가 없으면 기본 이미지가 표시됩니다.</p>
      {
        isChanged ? (
          <p style={{color: "red"}}>
            새로운 이미지가 업로드 되었습니다! 이미지 캐시(cache)로 인해 이미지 반영까지 최대 30분 정도 소요될 수 있습니다.
          </p>
        ) : null
      }
    </Form>
  )
}

export default ImageUploadForm;
