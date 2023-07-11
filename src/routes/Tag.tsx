interface TagProps {
  tagText: string;
}

const Tag: React.FC<TagProps> = ({tagText}) => {

  return (
      <>
        <div className={`bg-purple-800 rounded-full text-center px-5 text-sm font-semibold`}>
          {tagText}
        </div>
      </>
    );
}


export default Tag;