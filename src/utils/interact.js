
const contractABI = require('../assets/abi/contract-abi.json')
const secondsInDay = 24 * 60 * 60 * 1000;

export const buyDomain = async (
  web3Main,
  contractAddress,
  tld,
  time,
  address
) => {
  const contract = new web3Main.eth.Contract(contractABI, contractAddress)
  console.log('buying=', tld)
  const valueN = web3Main.utils.toBN(parseInt(10 ** 18 * 0.001))
  try {
    await web3Main.eth
      .sendTransaction({
        from: address,
        to: contractAddress,
        value: valueN,
        data: contract.methods
          .buyDomain(
            tld,
            time
          )
          .encodeABI(),
      })
      .then((res) => {
        console.log('res=', res);
        return {
          status: res
        }
      })
  }
  catch (error) {
    console.log('something went wrong=', error);
    return {
      status: false
    }
  }
}

export const domainByname = async (
  web3Main,
  contractAddress,
  name,
) => {
  console.log("domain by name: ", name)
  const contract = new web3Main.eth.Contract(contractABI, contractAddress)
  try {
    const status = await contract?.methods.readDomainByName(name).call()
    return {
      res: status
    }
  }
  catch (err) {
    console.log(err)
  }
}

export const buyBulkDomain = async (
  web3Main,
  contractAddress,
  names,
  times,
  price
) => {
  const accounts = await web3Main.eth.getAccounts();
  const account = accounts[0];
  const contract = await new web3Main.eth.Contract(contractABI, contractAddress)
  const valueN = web3Main.utils.toBN(parseInt(10 ** 18 * price))
  let temp_array = [];
  times.map((time) => {
    temp_array.push(time * secondsInDay);
  })
  try {
    await web3Main.eth
      .sendTransaction({
        from: account,
        to: contractAddress,
        value: valueN,
        data: contract.methods
          .bulkBuyDomain(
            names, temp_array
          )
          .encodeABI(),
      })
      .then((res) => {
        console.log('res=', res);
        window.alert("Domain Registered Successfully!");

        return {
          status: 'success'
        }
      })
  }
  catch (error) {
    console.log('something went wrong=', error);
    window.alert("Failed");
    return {
      status: false
    }
  }
}

export const search = async (
  web3Main,
  contractAddress,
  tld,
) => {
  const contract = await new web3Main.eth.Contract(contractABI, contractAddress)
  console.log('searching=', tld)
  try {
    await contract?.methods.isDomain(tld).call()
    return;
  }
  catch (err) {
    console.log(err)
  }
}

// export const domaininfo = async (
  // web3Main,
//   contractAddress,
//   domain,
// ) => {
//   const contract = await new web3Main.eth.Contract(contractABI, contractAddress)
//   try {
//     await contract.methods.reawdSubdomains(domain)
//       .then((res) => {
//         return {
//           searchResult: res
//         }
//       })
//   }
//   catch {
//     return {
//       searchResult: ''
//     }
//   }
// }

export const bulkSearch = async (
  web3Main,
  contractAddress,
  names,
) => {
  console.log("contract address: ", contractAddress);
  const contract = await new web3Main.eth.Contract(contractABI, contractAddress)
  try {
    console.log("names: ", names);
    const result = await contract.methods.bulkIsdomain(names).call()
    console.log("<<<<<<<<<<<<<<<<<<<<<<result: ", result);

    return {
      status: true,
      result: result
    }
  }
  catch (err) {
    console.log(err)
    return {
      status: false
    }
  }
}
