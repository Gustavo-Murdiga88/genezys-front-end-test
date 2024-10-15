interface ICepProps {
	cep: string;
	logradouro: string;
	complemento: string;
	unidade: string;
	bairro: string;
	localidade: string;
	uf: string;
	estado: string;
	regiao: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
}

type ReturnProps =
	| {
			success: true;
			data: ICepProps;
	  }
	| {
			success: false;
			data: null;
	  };

export async function getAddressByCep(cep: string): Promise<ReturnProps> {
	const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

	if (!response.ok) {
		return {
			success: false,
			data: null,
		};
	}

	const address = (await response.json()) as ICepProps;

	if ("erro" in address) {
		return {
			success: false,
			data: null,
		};
	}

	return {
		success: true,
		data: address,
	};
}
