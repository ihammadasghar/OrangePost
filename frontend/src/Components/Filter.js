import BlogsList from './BlogList';
import Create from './Create';
import useFetch from './useFetch'

const Filter = ({items}) => {
    const [itemList, setItemList] = useState(items.sort((a,b)=>(b.likes-a.likes)));
    const handlefilter = (f) => {
        switch(f) {
            case "Most Popular":
              setItemList(items.sort((a,b)=>(b.likes-a.likes)));
              break;
            case "Oldest First":
                setItemList(items.sort((a,b)=>(new Date(a.created) - new Date(b.created))));
                alert('old');
              break;
            case "Newest First":
                setItemList(blogs.sort((a,b)=>(new Date(b.created) - new Date(a.created))));
              break;
            default:
              alert('defu' + f);
          }
      }
      return(
        <select className="filter" onChange={(e)=>(handlefilter(e.target.value))}> 
            <option value="Most Popular">Most Popular</option>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
        </select>
      );
}
export default Filter;